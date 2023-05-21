import MessageRepository from "../repositories/MessageRepository";

export default class DeleteMessageService {
    public async execute(id: string): Promise<void> {
        const messageRepository = new MessageRepository();

        const message = await messageRepository.findById(id);

        if (!message) {
            throw new Error('Message not Found');
        }

        await messageRepository.remove(message);
    }
}