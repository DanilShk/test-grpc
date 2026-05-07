import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsGlobalModule } from '@app/clients-global';

@Module({
  imports: [ClientsGlobalModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
