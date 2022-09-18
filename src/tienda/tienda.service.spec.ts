import { Test, TestingModule } from '@nestjs/testing';
import { TiendaService } from './tienda.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
