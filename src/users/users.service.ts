import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { User } from './domain/user';
import { FilesService } from '../files/files.service';
import { RoleEnum } from '../roles/roles.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileType } from '../files/domain/file';
import { Role } from '../roles/domain/role';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Do not remove comment below.
    // <creating-property />

    // let password: string | undefined = undefined;
    //
    // if (createUserDto.password) {
    //   const salt = await bcrypt.genSalt();
    //   password = await bcrypt.hash(createUserDto.password, salt);
    // }
    //
    // const zaloId: string | null = null;
    //
    // if (createUserDto.email) {
    //   const userObject = await this.usersRepository.findByZaloId(
    //     createUserDto.email,
    //   );
    //   if (userObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         email: 'emailAlreadyExists',
    //       },
    //     });
    //   }
    //   zaloId = createUserDto.zaloId;
    // }
    //
    let avatar: FileType | null = null;

    if (createUserDto.avatar?.id) {
      const fileObject = await this.filesService.findById(
        createUserDto.avatar.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      avatar = fileObject;
    } else if (createUserDto.avatar === null) {
      avatar = null;
    }

    let role: Role | undefined = undefined;

    if (createUserDto.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(createUserDto.role.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        });
      }

      role = {
        id: createUserDto.role.id,
      };
    }

    // let status: Status | undefined = undefined;

    // if (createUserDto.status?.id) {
    //   const statusObject = Object.values(StatusEnum)
    //     .map(String)
    //     .includes(String(createUserDto.status.id));
    //   if (!statusObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         status: 'statusNotExists',
    //       },
    //     });
    //   }
    //
    //   status = {
    //     id: createUserDto.status.id,
    //   };
    // }
    //
    return this.usersRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      userName: createUserDto.userName,
      phoneNumber: createUserDto.phoneNumber,
      zaloId: createUserDto.zaloId,
      avatar: avatar,
      role: role,
      // provider: createUserDto.provider ?? AuthProvidersEnum.email,
      // socialId: createUserDto.socialId,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: User['id']): Promise<NullableType<User>> {
    console.log('service find user');
    return this.usersRepository.findById(id);
  }

  findByIds(ids: User['id'][]): Promise<User[]> {
    return this.usersRepository.findByIds(ids);
  }

  findByZaloId(zaloId: User['zaloId']): Promise<NullableType<User>> {
    return this.usersRepository.findByZaloId(zaloId);
  }

  // findBySocialIdAndProvider({
  //   socialId,
  //   provider,
  // }: {
  //   socialId: User['socialId'];
  //   provider: User['provider'];
  // }): Promise<NullableType<User>> {
  //   return this.usersRepository.findBySocialIdAndProvider({
  //     socialId,
  //     provider,
  //   });
  // }
  //
  async update(
    id: User['id'],
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    // Do not remove comment below.
    // <updating-property />

    // let password: string | undefined = undefined;
    //
    // if (updateUserDto.password) {
    //   const userObject = await this.usersRepository.findById(id);
    //
    //   if (userObject && userObject?.password !== updateUserDto.password) {
    //     const salt = await bcrypt.genSalt();
    //     password = await bcrypt.hash(updateUserDto.password, salt);
    //   }
    // }

    // let email: string | null | undefined = undefined;
    //
    // if (updateUserDto.email) {
    //   const userObject = await this.usersRepository.findByEmail(
    //     updateUserDto.email,
    //   );
    //
    //   if (userObject && userObject.id !== id) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         email: 'emailAlreadyExists',
    //       },
    //     });
    //   }
    //
    //   email = updateUserDto.email;
    // } else if (updateUserDto.email === null) {
    //   email = null;
    // }
    //
    let photo: FileType | null | undefined = undefined;

    if (updateUserDto.avatar?.id) {
      const fileObject = await this.filesService.findById(
        updateUserDto.avatar.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (updateUserDto.avatar === null) {
      photo = null;
    }

    let role: Role | undefined = undefined;

    if (updateUserDto.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(updateUserDto.role.id));
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        });
      }

      role = {
        id: updateUserDto.role.id,
      };
    }
    //
    // let status: Status | undefined = undefined;
    //
    // if (updateUserDto.status?.id) {
    //   const statusObject = Object.values(StatusEnum)
    //     .map(String)
    //     .includes(String(updateUserDto.status.id));
    //   if (!statusObject) {
    //     throw new UnprocessableEntityException({
    //       status: HttpStatus.UNPROCESSABLE_ENTITY,
    //       errors: {
    //         status: 'statusNotExists',
    //       },
    //     });
    //   }
    //
    //   status = {
    //     id: updateUserDto.status.id,
    //   };
    // }
    //
    return this.usersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      avatar: photo,
      userName: updateUserDto.userName,
      phoneNumber: updateUserDto.phoneNumber,
      zaloId: updateUserDto.zaloId,
      role: role,
    });
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
