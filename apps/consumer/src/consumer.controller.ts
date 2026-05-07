import {
  Empty,
  GetFilteredUsersRequest,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/proto/users/users';
import { Controller } from '@nestjs/common';

@UsersServiceControllerMethods()
@Controller()
export class ConsumerController implements UsersServiceController {
  getFilteredUsers(data: GetFilteredUsersRequest): Empty {
    console.log(data);
    return {};
  }
}
