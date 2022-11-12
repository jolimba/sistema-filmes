import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    birth_date: string

    @Column()
    email_user: string

    @Column()
    login_user: string

    @Column()
    pw_user: string
}