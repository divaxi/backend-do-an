import { registerAs } from '@nestjs/config';

import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { ZaloConfig } from './zalo-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  ZALO_CLIENT_SECRET: string;
  ZALO_VERIFY_URL: string;
}

export default registerAs<ZaloConfig>('zalo', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    // zaloSecret: process.env.GOOGLE_CLIENT_SECRET,
    zaloAppSecretKey: process.env.ZALO_CLIENT_SECRET,
    zaloVerifyURL: process.env.ZALO_VERIFY_URL,
  };
});
