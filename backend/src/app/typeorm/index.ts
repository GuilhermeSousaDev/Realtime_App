import { DataSource } from "typeorm";
import { Message } from "../../entity/Message";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8080,
    username: "postgres",
    password: "docker",
    database: "socket",
    synchronize: true,
    logging: false,
    entities: [Message],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => console.log("Conectado"))
    .catch(e => console.log(e));
