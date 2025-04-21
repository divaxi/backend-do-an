import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

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
    nullable: false,
    type: String,
  })
  role: string;

  @Column({
    nullable: true,
    type: String,
  })
  zaloId?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  phoneNumber: string;

  @Column({
    nullable: false,
    type: String,
  })
  fullName: string;

  @PrimaryGeneratedColumn('uuid')
  staffId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
