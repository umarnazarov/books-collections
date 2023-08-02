import { Test, TestingModule } from '@nestjs/testing';
import { CollectionController } from '../collection.controller';
import { CollectionService } from '../collection.service';

describe('CollectionController', () => {
  let controller: CollectionController;

  const mockCollectionService = {
    create: ({ title }) => ({
      _id: 'adasda',
      title,
    }),
    findAll: () => [
      {
        _id: expect.any(String),
        title: 'title',
      },
    ],
    update: () => ({
      message: 'Updated successfuly',
    }),

    findOne: (id: string) => ({
      _id: id,
      title: 'title',
    }),

    remove: ({ id }) => ({
      message: 'Deleted successfuly',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionController],
      providers: [CollectionService],
    })
      .overrideProvider(CollectionService)
      .useValue(mockCollectionService)
      .compile();

    controller = module.get<CollectionController>(CollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create collection', () => {
    expect(controller.create({ title: 'title' })).toEqual({
      _id: expect.any(String),
      title: 'title',
    });
  });

  it('should find all collection', () => {
    expect(controller.findAll()).toEqual([
      {
        _id: expect.any(String),
        title: 'title',
      },
    ]);
  });

  it('should find one by id', () => {
    expect(controller.findOne('1')).toEqual({
      _id: '1',
      title: 'title',
    });
  });

  it('remove collection should be called', () => {
    expect(controller.remove('1')).toEqual({
      message: 'Deleted successfuly',
    });
  });

  it('remove collection should be called', () => {
    expect(controller.update('1', { title: 'title' })).toEqual({
      message: 'Updated successfuly',
    });
  });
});
