import { Get, Post, Put, Delete, Param, Body, HttpCode, Controller, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ProductoService } from './producto.service';
import { ProductoDto } from './producto.dto';
import { ProductoEntity } from './producto.entity';

@Controller('productos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductoController {
    constructor(private readonly productoService: ProductoService){}

    @Get()
    async findAll() {
      return await this.productoService.findAll();
    }

    @Get(':productoId')
    async findOne(@Param('productoId') productoId: string) {
      return await this.productoService.findOne(productoId);
    }
  
    @Post()
    async create(@Body() productoDto: ProductoDto) {
      const producto: ProductoEntity = plainToInstance(ProductoEntity, productoDto);
      return await this.productoService.create(producto);
    }
  
    @Put(':productoId')
    async update(@Param('produtoId') productoId: string, @Body() productoDto: ProductoDto) {
      const producto: ProductoEntity = plainToInstance(ProductoEntity, productoDto);
      return await this.productoService.update(productoId, producto);
    }
  
    @Delete(':productoId')
    @HttpCode(204)
    async delete(@Param('productoId') productoId: string) {
      return await this.productoService.delete(productoId);
    }
}