import { Get, Post, Put, Delete, Param, Body, HttpCode, Controller, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TiendaService } from './tienda.service';
import { TiendaDto } from './tienda.dto';
import { TiendaEntity } from './tienda.entity';

@Controller('tiendas')
@UseInterceptors(BusinessErrorsInterceptor)
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService){}

    @Get()
    async findAll() {
      return await this.tiendaService.findAll();
    }

    @Get(':tiendaId')
    async findOne(@Param('tiendaId') tiendaId: string) {
      return await this.tiendaService.findOne(tiendaId);
    }
  
    @Post()
    async create(@Body() tiendaDto: TiendaDto) {
      const tienda: TiendaEntity = plainToInstance(TiendaEntity, tiendaDto);
      return await this.tiendaService.create(tienda);
    }
  
    @Put(':tiendaId')
    async update(@Param('tiendaId') tiendaId: string, @Body() tiendaDto: TiendaDto) {
      const tienda: TiendaEntity = plainToInstance(TiendaEntity, tiendaDto);
      return await this.tiendaService.update(tiendaId, tienda);
    }
  
    @Delete(':tiendaId')
    @HttpCode(204)
    async delete(@Param('tiendaId') tiendaId: string) {
      return await this.tiendaService.delete(tiendaId);
    }
}
