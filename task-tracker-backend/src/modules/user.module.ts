import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schemas/user.schema";
import { UserService } from "src/services/user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users',  schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}