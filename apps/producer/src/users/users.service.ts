import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { USERS_PACKAGE_TOKEN } from 'libs/clients-global/const/tokens.const';
import * as path from 'path';
import { UsersServiceClient } from '@app/proto/users/users';

@Injectable()
export class UsersService {
  private usersService: UsersServiceClient;

  constructor(@Inject(USERS_PACKAGE_TOKEN) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>('UsersService');
  }

  getFilteredUsers() {
    const users = JSON.parse(
      readFileSync(
        path.resolve(process.cwd(), 'apps/producer/src/data/users.json'),
        'utf8',
      ),
    );

    const filteredUsers = users.filter((user: any) => user.age > 18);

    return this.usersService.getFilteredUsers({ users: filteredUsers });
  }
}
