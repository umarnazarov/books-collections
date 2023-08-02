import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from '../schemas/collection.schema';
import { Model } from 'mongoose';
import { Book } from '../schemas/book.schema';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    try {
      const createdCollection = new this.collectionModel(createCollectionDto);
      return await createdCollection.save();
    } catch (e) {
      return new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try {
      return await this.collectionModel.find({});
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.collectionModel.findById(id);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    try {
      await this.collectionModel.findByIdAndUpdate(id, updateCollectionDto);

      return {
        status: HttpStatus.OK,
        message: 'Successfuly updated',
      };
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.collectionModel.findByIdAndRemove(id);

      return {
        status: HttpStatus.OK,
        message: 'Successfuly deleted',
      };
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAndPushBook(genre: string, savedBook: Book) {
    try {
      return await this.collectionModel.updateOne(
        { title: genre },
        { $push: { books: savedBook } },
        { upsert: true },
      );
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
