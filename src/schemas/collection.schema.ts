import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection {
  @Prop({
    unique: true,
    required: true,
  })
  title: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Book' })
  books: [];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
