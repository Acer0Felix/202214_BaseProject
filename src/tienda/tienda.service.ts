import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class TiendaService {

    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>
    ){}

    async findAll(): Promise<TiendaEntity[]> {
        return await this.tiendaRepository.find({ relations: ["productos"] });
    }

    async findOne(id: string): Promise<TiendaEntity> {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id}, relations: ["productos"] } );
        if (!tienda)
          throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
   
        return tienda;
    }

    async create(tienda: TiendaEntity): Promise<TiendaEntity> {
        if(tienda.ciudad == 'SMR' || tienda.ciudad == 'BOG' || tienda.ciudad == 'MED'){
            return await this.tiendaRepository.save(tienda);
        }else{
            throw new BusinessLogicException("The store with the given id was not in the target type", BusinessError.NOT_FOUND);
        }
        
    }

    async update(id: string, tienda: TiendaEntity): Promise<TiendaEntity> {
        const persistedTienda: TiendaEntity = await this.tiendaRepository.findOne({where:{id}});
        if (!persistedTienda)
          throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
        
        if(tienda.ciudad == 'SMR' || tienda.ciudad == 'BOG' || tienda.ciudad == 'MED'){
            return await this.tiendaRepository.save({...persistedTienda, ...tienda});
        }else{
            throw new BusinessLogicException("The store with the given id was not in the database", BusinessError.NOT_FOUND);
        }
    }

    async delete(id: string) {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where:{id}});
        if (!tienda)
          throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.tiendaRepository.remove(tienda);
    }
}
