import { NestFactory } from '@nestjs/core';
import { SeedModule, SeedServiceRunner } from './seed.module';
import { Logger } from '@nestjs/common';

const runSeed = async () => {
  const logger = new Logger('RunSeed');
  // Tạo context ứng dụng NestJS độc lập
  const app = await NestFactory.createApplicationContext(SeedModule, {
    // Tắt logger mặc định của NestJS để tránh log không cần thiết khi chạy seed
    logger: ['error', 'warn'], // Chỉ log lỗi và cảnh báo
  });

  logger.log('Starting seeding process...');

  // Lấy SeedServiceRunner từ context
  const seeder = app.get(SeedServiceRunner);

  try {
    await seeder.run();
    logger.log('Seeding completed successfully!');
  } catch (error) {
    logger.error('Seeding failed!');
    logger.error(error);
  } finally {
    // Đóng context ứng dụng
    await app.close();
    process.exit(0); // Thoát tiến trình sau khi hoàn thành hoặc lỗi
  }
};

void runSeed();
