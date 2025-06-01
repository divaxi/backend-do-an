import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { OpenAIConfig } from './open-ai-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  OPEN_AI_SECRET_KEY: string;

  @IsString()
  OPEN_AI_MODEL: string;

  @IsString()
  SYSTEM_PROMPT: string;
}

export default registerAs<OpenAIConfig>('openAI', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    openAISecretKey: process.env.OPEN_AI_SECRET_KEY,
    openAIModel: process.env.OPEN_AI_MODEL,
    systemPrompt: process.env.SYSTEM_PROMPT,
  };
});
