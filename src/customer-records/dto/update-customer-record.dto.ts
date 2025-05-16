// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateCustomerRecordDto } from './create-customer-record.dto';

export class UpdateCustomerRecordDto extends PartialType(
  CreateCustomerRecordDto,
) {}
