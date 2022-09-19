import { Test, TestingModule } from '@nestjs/testing';
import { TiendaService } from './tienda.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendasList: TiendaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tiendasList = [];
    for(let i = 0; i < 5; i++){
        const tienda: TiendaEntity = await repository.save({
        nombre: faker.company.name(),
        ciudad: faker.address.city(),
        dirección: faker.address.streetAddress()})
        tiendasList.push(tienda);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all stores', async () => {
    const tiendas: TiendaEntity[] = await service.findAll();
    expect(tiendas).not.toBeNull();
    expect(tiendas).toHaveLength(tiendasList.length);
  });

  it('findOne should return a store by id', async () => {
    const storedTienda: TiendaEntity = tiendasList[0];
    const tienda: TiendaEntity = await service.findOne(storedTienda.id);
    expect(tienda).not.toBeNull();
    expect(tienda.nombre).toEqual(storedTienda.nombre)
    expect(tienda.ciudad).toEqual(storedTienda.ciudad)
    expect(tienda.dirección).toEqual(storedTienda.dirección)
  });

  it('findOne should throw an exception for an invalid store', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The store with the given id was not found")
  });

  it('create should return a new store', async () => {
    const tienda: TiendaEntity = {
      id: "",
      nombre: faker.commerce.product(),
      ciudad: faker.address.city(),
      dirección: faker.address.streetAddress(),
      productos: []
    }
 
    const newTienda: TiendaEntity = await service.create(tienda);
    expect(newTienda).not.toBeNull();
 
    const storedTienda: TiendaEntity = await repository.findOne({where: {id: newTienda.id}})
    expect(storedTienda).not.toBeNull();
    expect(storedTienda.nombre).toEqual(newTienda.nombre)
    expect(storedTienda.ciudad).toEqual(newTienda.ciudad)
    expect(storedTienda.dirección).toEqual(newTienda.dirección)
  });
  
  it('update should modify a store', async () => {
    const tienda: TiendaEntity = tiendasList[0];
    tienda.nombre = "New name";
    tienda.ciudad = "New City";
    tienda.dirección = "New Address";

    const updatedProducto: TiendaEntity = await service.update(tienda.id, tienda);
    expect(updatedProducto).not.toBeNull();
     const storedProducto: TiendaEntity = await repository.findOne({ where: { id: tienda.id } })
    expect(storedProducto).not.toBeNull();
    expect(storedProducto.nombre).toEqual(tienda.nombre)
    expect(storedProducto.ciudad).toEqual(tienda.ciudad)
    expect(storedProducto.dirección).toEqual(tienda.dirección)
  });

  it('update should throw an exception for an invalid store', async () => {
    let tienda: TiendaEntity = tiendasList[0];
    tienda = {
      ...tienda, nombre: "New name", ciudad: "New City", dirección: "New address"
    }
    await expect(() => service.update("0", tienda)).rejects.toHaveProperty("message", "The store with the given id was not found")
  });

  it('delete should remove a store', async () => {
    const tienda: TiendaEntity = tiendasList[0];
    await service.delete(tienda.id);
     const deletedTienda: TiendaEntity = await repository.findOne({ where: { id: tienda.id } })
    expect(deletedTienda).toBeNull();
  });

  it('delete should throw an exception for an invalid store', async () => {
    const tienda: TiendaEntity = tiendasList[0];
    await service.delete(tienda.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The store with the given id was not found")
  });
});

