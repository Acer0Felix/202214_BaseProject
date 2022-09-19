import { Test, TestingModule } from '@nestjs/testing';
import { TiendaProductoService } from './tienda-producto.service';
import { Repository } from 'typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('TiendaProductoService', () => {
  let service: TiendaProductoService;
  let tiendaRepository: Repository<TiendaEntity>
  let productoRepository: Repository<ProductoEntity>
  let tienda: TiendaEntity;
  let productosList: ProductoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaProductoService]
    }).compile();

    service = module.get<TiendaProductoService>(TiendaProductoService);
    tiendaRepository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    productoRepository = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    productoRepository.clear();
    tiendaRepository.clear();

    productosList = [];
    for(let i = 0; i < 5; i++){
        const producto: ProductoEntity = await productoRepository.save({
          nombre: faker.commerce.productName(), 
          precio: faker.datatype.number(),
          tipo: faker.commerce.productAdjective(),
        })
        productosList.push(producto);
    }

    tienda = await tiendaRepository.save({
      nombre: faker.company.name(),
      ciudad: faker.address.city(),
      dirección: faker.address.streetAddress(),
      productos: productosList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
