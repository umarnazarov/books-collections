import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Role } from 'src/common/types/rule.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  displayName: string;

  @Prop({
    default: Role.USER,
  })
  roles: Role[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Book' })
  savedBooks: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
