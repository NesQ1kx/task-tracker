import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Messenger, Tracker } from 'src/utils/types';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'src/utils/status-codes.enum';
import { ISuccessOperation } from 'src/interfaces/success-operation.interface';

const SALT_OR_ROUNDS = 10;
@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userDto = { ...createUserDto };
    const hashedPassword = await this.generateHash(userDto.password);
    const createdUser = new this.userModel({ ...userDto, password: hashedPassword, connectedMessengers: [], connectedTrackers: []});
    return createdUser.save();
  }

  public async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  public async getUserData(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).select('-password');
  }

  public async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  public async checkUserPassword(candidate: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidate, userPassword);
  }

  public async updateConfirmationStatus(email: string): Promise<void> {
    await this.userModel.updateOne({ email }, { isConfirmed: true });
  }

  public async addMessenger(email: string, messenger: Messenger): Promise<void> {
    await this.userModel.updateOne({ email }, { $push: { connectedMessengers: { ...messenger, connectDate: + new Date() } } });
  }

  public async removeMessenger(email: string, messenger: Messenger): Promise<void> {
    await this.userModel.updateOne({ email }, { $pull: { connectedMessengers: { id: messenger.id } } });
  }

  public async addTracker(email: string, tracker: Tracker) {
    await this.userModel.updateOne({ email }, { $push: { connectedTrackers: { ...tracker, connectDate: + new Date() } } });
  }

  public async removeTracker(email: string, tracker: Tracker) {
    await this.userModel.updateOne({ email }, { $pull: { connectedTrackers: { id: tracker.id } } });
  }

  public async updateUserSettings(email: string, fieldName: string, value: string): Promise<ISuccessOperation> {
    const userModel = await this.userModel.findOne({ email });
    if (userModel && userModel[fieldName]) {
      userModel[fieldName] = value;
      await userModel.save();

      return { statusCode: StatusCodes.PROFILE_UPDATED };
    }
  }
}
