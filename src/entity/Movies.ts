import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Movies {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Poster_Link: string

    @Column()
    Series_Title: string

    @Column()
    Released_Year: string

    @Column()
    Certificate: string

    @Column()
    Runtime: string

    @Column()
    Genre: string

    @Column()
    IMDB_Rating: string

    @Column()
    Overview: string

    @Column()
    Meta_score: string

    @Column()
    Director: string

    @Column()
    Star1: string

    @Column()
    Star2: string

    @Column()
    Star3: string

    @Column()
    Star4: string

    @Column()
    No_of_Votes: string

    @Column()
    Gross: string
}