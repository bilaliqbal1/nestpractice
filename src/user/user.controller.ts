import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/Get-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() input: CreateUserDto) {
    const access_token = await this.userService.signup(input);
    return { access_token };
  }

  @Post('signin')
  async signin(@Body() input: GetUserDto) {
    const access_token = await this.userService.signin(input);

    return { access_token };
  }
}
