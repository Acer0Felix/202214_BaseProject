import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>
    ){}

    async findAll(): Promise<ProductoEntity[]> {
        return await this.productoRepository.find({ relations: ["tiendas"] });
    }

    async findOne(id: string): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id}, relations: ["tiendas"] } );
        if (!producto)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
   
        return producto;
    }

    async create(producto: ProductoEntity): Promise<ProductoEntity> {
        if(producto.tipo == 'Perecedero' || producto.tipo == 'No perecedero'){
            return await this.productoRepository.save(producto);
        }else{
            throw new BusinessLogicException("The product with the given id was not in the target type", BusinessError.NOT_FOUND);
        }
        
    }

    async update(id: string, producto: ProductoEntity): Promise<ProductoEntity> {
        const persistedProducto: ProductoEntity = await this.productoRepository.findOne({where:{id}});
        if (!persistedProducto)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
        
        if(producto.tipo == 'Perecedero' || producto.tipo == 'No perecedero'){
            return await this.productoRepository.save({...persistedProducto, ...producto});
        }else{
            throw new BusinessLogicException("The product with the given id was not in the database", BusinessError.NOT_FOUND);
        }
    }

    async delete(id: string) {
        const producto: ProductoEntity = await this.productoRepository.findOne({where:{id}});
        if (!producto)
          throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.productoRepository.remove(producto);
    }


}
