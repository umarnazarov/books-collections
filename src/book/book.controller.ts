import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { CollectionService } from 'src/collection/collection.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types/rule.enum';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly collectionService: CollectionService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      file?: Multer.File[];
      cover?: Multer.File[];
    },
    @Body() bookInfo: CreateBookDto,
  ) {
    const savedBook = await this.bookService.create(
      files.file[0],
      files.cover[0],
      bookInfo,
    );
    await this.collectionService.updateAndPushBook(bookInfo.genre, savedBook);

    return {
      message: 'Successfuly Created',
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
