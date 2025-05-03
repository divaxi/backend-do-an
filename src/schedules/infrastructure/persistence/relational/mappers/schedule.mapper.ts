import { Schedule } from '../../../../domain/schedule';

import { StaffMapper } from '../../../../../staffs/infrastructure/persistence/relational/mappers/staff.mapper';

import { ScheduleEntity } from '../entities/schedule.entity';

export class ScheduleMapper {
  static toDomain(raw: ScheduleEntity): Schedule {
    const domainEntity = new Schedule();
    domainEntity.note = raw.note;

    domainEntity.active = raw.active;

    domainEntity.endTime = raw.endTime;

    domainEntity.startTime = raw.startTime;

    if (raw.staff) {
      domainEntity.staff = StaffMapper.toDomain(raw.staff);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Schedule): ScheduleEntity {
    const persistenceEntity = new ScheduleEntity();
    persistenceEntity.note = domainEntity.note;

    persistenceEntity.active = domainEntity.active;

    persistenceEntity.endTime = domainEntity.endTime;

    persistenceEntity.startTime = domainEntity.startTime;

    if (domainEntity.staff) {
      persistenceEntity.staff = StaffMapper.toPersistence(domainEntity.staff);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
