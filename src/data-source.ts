import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"
import { Movies } from "./entity/Movies"
import { Lists } from "./entity/Lists"

export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "ec2-34-193-44-192.compute-1.amazonaws.com",
    host: "localhost",
    // port: 5432,
    port: 5433,
    // username: "qvsxerlxbjtxqm",
    username: "postgres",
    // password: "0ce4f257f6346add4e78aecd16d2699fea407a203a45f4cd0af1583b754aab48",
    password: "1234",
    // database: "d7p6mert92evd7",
    database: "tcc",
    synchronize: false,
    logging: false,
    entities: [Users, Movies],
    migrations: [],
    subscribers: [],
    // ssl: {
    //     rejectUnauthorized: false,
    // }
})