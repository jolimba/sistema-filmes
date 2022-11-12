import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"
import { Movies } from "./entity/Movies"
import { Lists } from "./entity/Lists"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.ACCESS_HOST_ELEPHANT,
    // host: "localhost",
    port: parseInt(process.env.ACCESS_PORT_ELEPHANT),
    // port: 5433,
    username: process.env.ACCESS_USERNAME_ELEPHANT,
    // username: "postgres",
    password: process.env.ACCESS_PASSWORD_ELEPHANT,
    // password: "1234",
    database: process.env.ACCESS_DB_ELEPHANT,
    // database: "tcc",
    synchronize: false,
    logging: false,
    entities: [Users, Movies, Lists],
    // migrations: [],
    // subscribers: [],
    extra: {
        max: 5, // set pool max size
    },
    // ssl: {
    //     rejectUnauthorized: false,
    // }
})