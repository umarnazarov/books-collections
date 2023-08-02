import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({
    unique: true,
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  author: string;

  @Prop({
    required: true,
  })
  genre: string;

  @Prop()
  published: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
  })
  coverImage: string;

  @Prop({
    required: true,
  })
  fileUrl: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
