import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/create-user.dto";
import { User, UserDocument } from "src/schemas/user.schema";
import * as bcrypt from "bcrypt";

const SALT_OR_ROUNDS = 10;
@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userDto = { ...createUserDto };
    userDto.password = await this.generateHash(userDto.password);
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  public async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  private async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  public async updateConfirmationStatus(email: string): Promise<void> {
    await this.userModel.updateOne({ email }, { isConfirmed: true });
  }
}