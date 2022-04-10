import { User } from "src/schemas/user.schema";

export class UpdateUserSettingsDto {
  readonly fieldName: keyof User;
  readonly value: string | string[];
}