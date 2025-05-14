import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './infrastructure/persistence/message.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Message } from './domain/message';

@Injectable()
export class MessagesService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    // Do not remove comment below.
    // <creating-property />

    const userObject = await this.userService.findById(
      createMessageDto.user.id,
    );
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.messageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      role: createMessageDto.role,

      content: createMessageDto.content,

      user,
    });
  }

  async bulkCreate(
    bulkCreateMessageDto: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>[],
  ) {
    return this.messageRepository.bulkCreate(bulkCreateMessageDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.messageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Message['id']) {
    return this.messageRepository.findById(id);
  }

  findByIds(ids: Message['id'][]) {
    return this.messageRepository.findByIds(ids);
  }

  findByUser(userId: User['id']) {
    return this.messageRepository.findByUser(userId);
  }

  async update(
    id: Message['id'],

    updateMessageDto: UpdateMessageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | undefined = undefined;

    if (updateMessageDto.user) {
      const userObject = await this.userService.findById(
        updateMessageDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.messageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      role: updateMessageDto.role,

      content: updateMessageDto.content,

      user,
    });
  }

  remove(id: Message['id']) {
    return this.messageRepository.remove(id);
  }
}
