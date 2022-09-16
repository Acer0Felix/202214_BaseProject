import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TiendaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    ciudad: string;

    @Column()
    dirección: string;
}
