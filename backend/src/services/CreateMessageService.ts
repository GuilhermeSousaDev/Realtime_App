import { Message } from "../entity/Message";
import RedisCache from "../app/redis";
import MessageRepository from "../repositories/MessageRepository";

interface IRequest {
    message: string;
}

export default class CreateMessageService {
    public async execute(data: IRequest): Promise<Message> {
        const messageRepository = new MessageRepository();
        const redisCache = new RedisCache();

        const message = await messageRepository.create({ message: data.message });

        await messageRepository.save(message);
        await redisCache.invalidate('messages');

        return message;
    }
}