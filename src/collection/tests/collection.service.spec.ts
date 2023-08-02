import { Test, TestingModule } from '@nestjs/testing';
import { CollectionService } from '../collection.service';
import { getModelToken } from '@nestjs/mongoose';
import { Collection } from 'src/schemas/collection.schema';
import { CreateCollectionDto } from '../dto/create-collection.dto';

describe('CollectionService', () => {
  let service: CollectionService;

  const mockCollectionModel = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ _id: '12', ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionService],
      imports: [],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create collection and return', async () => {
    expect(await service.create({ title: 'title' })).toEqual({
      _id: expect.any(String),
      title: 'title',
    });
  });
});
