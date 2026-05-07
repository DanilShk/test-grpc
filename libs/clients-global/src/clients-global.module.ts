import { USERS_PACKAGE_NAME } from '@app/proto/users/users';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { Global } from '@nestjs/common';
import { USERS_PACKAGE_TOKEN } from '../const/tokens.const';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_PACKAGE_TOKEN,
        transport: Transport.GRPC,
        options: {
          package: USERS_PACKAGE_NAME,
          protoPath: path.resolve(process.cwd(), 'libs/proto/src/users/users.proto'),
          url: process.env.GRPC_USERS_URL ?? '0.0.0.0:50050',
        },
      },
    ]),
  ],
  providers: [],
  exports: [ClientsModule],
})
export class ClientsGlobalModule {}
