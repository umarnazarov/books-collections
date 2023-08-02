import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateUser(details: CreateUserDto) {
    const user = await this.userModel.findOne({ email: details.email });

    if (user) return user;

    const newUser = await this.userModel.create(details);
    return newUser.save();
  }

  async findUser(id: string) {
    return await this.userModel.findById(id);
  }
}
