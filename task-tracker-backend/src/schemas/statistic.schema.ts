import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type StatisticDocument = Statistic & Document;

@Schema() 
export class Statistic {
  @Prop()
  userEmail: string;

  @Prop()
  date: number;

  @Prop()
  trackerName: string;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);