import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    birthDate: string

    @Column()
    emailUser: string

    @Column()
    loginUser: string

    @Column()
    pwUser: string
}