import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'staff',
})
export class StaffEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  note?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  specialization?: string | null;

  @PrimaryGeneratedColumn('uuid')
  staffId: string;

  @OneToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn()
  userId?: UserEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
