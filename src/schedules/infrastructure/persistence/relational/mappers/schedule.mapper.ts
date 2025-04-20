import { Schedule } from '../../../../domain/schedule';
import { ScheduleEntity } from '../entities/schedule.entity';

export class ScheduleMapper {
  static toDomain(raw: ScheduleEntity): Schedule {
    const domainEntity = new Schedule();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Schedule): ScheduleEntity {
    const persistenceEntity = new ScheduleEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
