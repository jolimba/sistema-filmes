import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('movies')
export class Movies {

    @PrimaryGeneratedColumn()
    id_program: number

    @Column()
    series_title: string

    @Column()
    genre: string

    @Column()
    imdb_rating: string

    @Column()
    overview: string

    @Column()
    director: string

    @Column()
    star1: string

    @Column()
    star2: string
}