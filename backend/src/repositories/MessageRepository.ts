import { Repository } from "typeorm";
import { Message } from "../entity/Message";
import { AppDataSource } from "../typeorm";

interface ICreateMessage {
    message: string;
}

export default class MessageRepository {
    ormRepository: Repository<Message>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Message);
    }

    public async find(): Promise<Message[]> {
        return this.ormRepository.find();
    }

    public async findById(id: string): Promise<Message> {
        return this.ormRepository.findOne({ where: { id } });
    }

    public async create(data: ICreateMessage): Promise<Message> {
        return this.ormRepository.create(data);
    }
}