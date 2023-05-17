import { Repository } from "typeorm";
import { Message } from "../entity/Message";
import { AppDataSource } from "../app/typeorm";

interface ICreateMessage {
    message: string;
}

export default class MessageRepository {
    ormRepository: Repository<Message>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Message);
    }

    public async save(message: Message): Promise<Message> {
        return this.ormRepository.save(message);
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

    public async remove(message: Message): Promise<Message> {
        return this.ormRepository.remove(message);
    }
}