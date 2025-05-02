import {
  // HttpStatus,
  Injectable,
  // NotFoundException,
  UnauthorizedException,
  // UnprocessableEntityException,
} from '@nestjs/common';
import ms from 'ms';
import crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
// import bcrypt from 'bcryptjs';
// import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
// import { AuthUpdateDto } from './dto/auth-update.dto';
// import { AuthProvidersEnum } from './auth-providers.enum';
// import { SocialInterface } from '../social/interfaces/social.interface';
// import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponseDto } from './dto/login-response.dto';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { UsersService } from '../users/users.service';
import { AllConfigType } from '../config/config.type';
// import { MailService } from '../mail/mail.service';
// import { RoleEnum } from '../roles/roles.enum';
import { Session } from '../session/domain/session';
import { SessionService } from '../session/session.service';
// import { StatusEnum } from '../statuses/statuses.enum';
import { User } from '../users/domain/user';
import { AuthZaloLoginDto } from './dto/auth-zalo-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthZaloLoginDto): Promise<LoginResponseDto> {
    console.log(loginDto.zaloAccessToken);
    let user = await this.usersService.findByZaloId(loginDto.zaloAccessToken);

    if (!user) {
      // throw new UnprocessableEntityException({
      //   status: HttpStatus.UNPROCESSABLE_ENTITY,
      //   errors: {
      //     email: 'notFound',
      //   },
      // });
      user = await this.usersService.create({
        zaloId: loginDto.zaloAccessToken,
        userName: 'Gustav',
        phoneNumber: loginDto.zaloAccessToken,
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
      userId: user.userId,
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
    return this.usersService.findById(userJwtPayload.userId);
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

    const user = await this.usersService.findById(session.user.userId);

    if (!user?.role) {
      throw new UnauthorizedException();
    }

    await this.sessionService.update(session.id, {
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      userId: session.user.userId,
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
    userId: User['userId'];
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
          userId: data.userId,
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
