import {Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm"; 
import {Movies} from "./Movies";
import {Users} from "./Users";

@Entity('lists')
export class Lists {

    @PrimaryGeneratedColumn()
    id_list: number

    @OneToOne(type => Users) @JoinColumn()
    users: Users

    @OneToOne(type => Movies) @JoinColumn()
    movies: Movies

}