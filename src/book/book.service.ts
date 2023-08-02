import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Multer } from 'multer';
import { Model } from 'mongoose';

import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/schemas/book.schema';
import { S3Service } from 'src/s3/s3.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Collection } from 'src/schemas/collection.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private s3Service: S3Service,
  ) {}

  async create(file: Multer.File, cover: Multer.File, bookInfo: CreateBookDto) {
    const { originalname: fileOriginalname, buffer: fileBuffer } = file;
    const { originalname: coverOriginalname, buffer: coverBuffer } = cover;
    const { title, author, description, genre, published } = bookInfo;

    try {
      const fileUrl = await this.s3Service.upload(fileOriginalname, fileBuffer);
      const coverImage = await this.s3Service.upload(
        coverOriginalname,
        coverBuffer,
      );

      const bookToSave: Book = {
        title,
        author,
        description,
        genre,
        published,
        coverImage,
        fileUrl,
      };

      const book = await this.bookModel.create(bookToSave);
      const savedBook = await book.save();

      return savedBook;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
