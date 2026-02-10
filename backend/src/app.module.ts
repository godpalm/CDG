import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',      // เพราะ NestJS รันอยู่ที่เครื่อง Mac โดยตรง
      port: 3306,
      username: 'palmuser',   // ใช้ MARIADB_USER ที่คุณตั้งไว้
      password: 'palmpassword', // ใช้ MARIADB_PASSWORD ที่คุณตั้งไว้
      database: 'mydb',       // ใช้ MARIADB_DATABASE
      autoLoadEntities: true, 
      entities: [User],
      synchronize: true,      // สั่งให้สร้างตารางอัตโนมัติ (เฉพาะช่วงพัฒนา)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
