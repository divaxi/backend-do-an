import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import ms from 'ms';
import crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseDto } from './dto/login-response.dto';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { UsersService } from '../users/users.service';
import { AllConfigType } from '../config/config.type';
import { Session } from '../session/domain/session';
import { SessionService } from '../session/session.service';
import { User } from '../users/domain/user';
import { AuthZaloLoginDto } from './dto/auth-zalo-login.dto';
import { RoleEnum } from '../roles/roles.enum';
import axios from 'axios';
import { FilesService } from '../files/files.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    private configService: ConfigService<AllConfigType>,
    private fileService: FilesService,
  ) {}

  async validateLogin(loginDto: AuthZaloLoginDto): Promise<LoginResponseDto> {
    const zaloAppSecret = this.configService.getOrThrow<string>(
      'zalo.zaloAppSecretKey',
      {
        infer: true,
      },
    );

    const calculateHMacSHA256 = (data: string, secretKey: string) => {
      const hmac = crypto.createHmac('sha256', secretKey);
      hmac.update(data);
      return hmac.digest('hex');
    };

    const appsecretProof = calculateHMacSHA256(
      loginDto.zaloAccessToken,
      zaloAppSecret,
    );

    const { data: zaloUser } = await axios.get(
      'https://graph.zalo.me/v2.0/me',
      {
        headers: {
          access_token: loginDto.zaloAccessToken,
          appsecret_proof: appsecretProof,
        },
        params: {
          fields: 'id,name,birthday,picture',
        },
      },
    );

    if (!zaloUser) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: {
          zaloUser: 'Something happened',
        },
      });
    }
    const { id, name, picture } = zaloUser;

    let user = await this.usersService.findByZaloId(id);

    if (!user) {
      // throw new UnprocessableEntityException({
      //   status: HttpStatus.UNPROCESSABLE_ENTITY,
      //   errors: {
      //     email: 'notFound',
      //   },
      // });
      const avatarObject = await this.fileService.create({
        path: picture?.data?.url,
      });

      if (!avatarObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            avatar: 'notFound',
          },
        });
      }

      user = await this.usersService.create({
        zaloId: loginDto.zaloAccessToken,
        userName: name,
        phoneNumber: loginDto.phoneNumber,
        role: { id: RoleEnum.user },
        avatar: avatarObject,
      });
    }
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({
      user,
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token,
      tokenExpires: Number(tokenExpires),
      user,
    };
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.usersService.findById(userJwtPayload.id);
  }

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findById(data.sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException();
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.findById(session.user.id);

    if (!user?.role) {
      throw new UnauthorizedException();
    }

    await this.sessionService.update(session.id, {
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      role: {
        id: user.role.id,
      },
      sessionId: session.id,
      hash,
    });

    return {
      token,
      refreshToken,
      tokenExpires: Number(tokenExpires),
    };
  }
  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.deleteById(data.sessionId);
  }

  private async getTokensData(data: {
    id: User['id'];
    role: User['role'];
    sessionId: Session['id'];
    hash: Session['hash'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow<number>(
      'auth.expires',
      {
        infer: true,
      },
    );

    const tokenExpires = Date.now() + ms(tokenExpiresIn);
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow<string>('auth.secret', {
            infer: true,
          }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow<string>('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow<number>(
            'auth.refreshExpires',
            {
              infer: true,
            },
          ),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
