import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;
}