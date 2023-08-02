import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from 'src/schemas/book.schema';
import { S3Module } from 'src/s3/s3.module';
import { CollectionModule } from 'src/collection/collection.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    S3Module,
    CollectionModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
