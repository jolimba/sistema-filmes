import {Entity, Column, OneToOne, JoinColumn} from "typeorm"; 
import {Movies} from "./Movies";
import {Users} from "./Users";

@Entity()
export class Lists {

    @OneToOne(type => Movies) @JoinColumn()
    id_movies: Movies

    @OneToOne(type => Users) @JoinColumn()
    id_users: Users
    
}