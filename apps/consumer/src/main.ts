import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import * as path from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME } from '@app/proto/users/users';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ConsumerModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USERS_PACKAGE_NAME,
        protoPath: path.resolve(
          process.cwd(),
          'libs/proto/src/users/users.proto',
        ),
        url: '0.0.0.0:50050',
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    },
  );

  await app.listen();
}
bootstrap().then(() => {
  console.log('Consumer is running on port 50050');
});
