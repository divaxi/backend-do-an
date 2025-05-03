import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '../../../config/app.config';
import databaseConfig from '../../config/database.config';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { UserSeedModule } from './user/user-seed.module';
import { UserSeedService } from './user/user-seed.service';

/**
 * Service tổng hợp để chạy tất cả các seed.
 */
@Module({
  providers: [
    // Provider này không thực sự cần thiết nếu chúng ta gọi trực tiếp từ run-seed.ts
    // Nhưng để đây nếu muốn có một service trung tâm quản lý logic seed phức tạp hơn.
    // Có thể tạo một SeedService riêng nếu cần.
  ],
})
export class SeedServiceRunner {
  constructor(private readonly userSeedService: UserSeedService) {}

  async run() {
    await this.userSeedService.run();
    // Thêm các service seed khác ở đây nếu có
    // await this.anotherSeedService.run();
  }
}

@Module({
  imports: [
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
    }),
  ],
  providers: [SeedServiceRunner], // Cung cấp SeedServiceRunner để run-seed.ts có thể inject
})
export class SeedModule {}
