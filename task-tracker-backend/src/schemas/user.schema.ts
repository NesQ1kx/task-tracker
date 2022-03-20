import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Messenger, Tracker } from "src/utils/types";

export type UserDocument = User & Document;

@Schema() 
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isConfirmed: boolean;

  @Prop()
  connectedMessengers: Messenger[];

  @Prop()
  connectedTrackers: Tracker[];
}

export const UserSchema = SchemaFactory.createForClass(User);