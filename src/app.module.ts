import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { TiendaModule } from './tienda/tienda.module';
import { ProductoTiendaModule } from './producto-tienda/producto-tienda.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda/tienda.entity';
import { ProductoEntity } from './producto/producto.entity';
import { TiendaProductoModule } from './tienda-producto/tienda-producto.module';

@Module({
  imports: [ProductoModule, TiendaModule, ProductoTiendaModule, 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Sol1DeoGlor1a',
    database: 'tienda',
    entities: [ProductoEntity, TiendaEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }), TiendaProductoModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
