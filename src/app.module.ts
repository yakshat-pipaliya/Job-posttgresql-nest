import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { JobListingModule } from './job-listing/job-listing.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { JobApplicationStatusModule } from './job-application-status/job-application-status.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: '/var/www/html/resume',
      serveRoot: '/uploads/resume',
    }),
    DatabaseModule,
    UserModule,
    CompanyModule,
    JobListingModule,
    JobApplicationModule,
    JobApplicationStatusModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
