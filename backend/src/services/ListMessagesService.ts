import { Message } from "../entity/Message";
import MessageRepository from "../repositories/MessageRepository";
import RedisCache from "../app/redis";

export default class ListMessagesService {
    public async execute(): Promise<Message[]> {
        let messages = [];
        const redisCache = new RedisCache();
    
        messages = await redisCache.recover<Message[]>('messages');

        if (!messages) {
            const messageRepository = new MessageRepository();

            messages = await messageRepository.find(); 
        }

        return messages;
    }
}