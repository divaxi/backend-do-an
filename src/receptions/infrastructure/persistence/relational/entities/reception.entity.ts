import { AppointmentEntity } from '../../../../../appointments/infrastructure/persistence/relational/entities/appointment.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { StatusEnum } from '../../../../status.enum';

@Entity({
  name: 'reception',
})
export class ReceptionEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  note?: string | null;

  @Column({
    nullable: false,
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;

  @Column({
    nullable: true,
    type: Date,
  })
  checkinTime?: Date | null;

  @OneToOne(() => AppointmentEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Appointment: AppointmentEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
