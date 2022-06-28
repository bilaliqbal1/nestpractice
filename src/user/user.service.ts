import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/Get-user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(input: CreateUserDto) {
    const check = await this.userModel.findOne({ email: input.email });
    if (check?.email) throw new UnauthorizedException('User already exists');

    const hashedpassword = await bcrypt.hash(input.password, 10);
    const user = new this.userModel({
      username: input.username,
      email: input.email,
      password: hashedpassword,
    });

    await user.save();
    return this.signUser(check?._id, check?.email, check?.username);
  }

  async signin(input: GetUserDto) {
    const check = await this.userModel.findOne({ email: input.email });
    if (!check?.email) throw new UnauthorizedException('User doesnot exists');
    const match = await bcrypt.compare(input.password, check?.password);
    if (!match) throw new UnauthorizedException('Incorrect password');
    return this.signUser(check?._id, check?.email, check?.username);
  }

  async signUser(userId: object, email: string, username: string) {
    return this.jwtService.sign({
      userId,
      email,
      username,
    });
  }
}
