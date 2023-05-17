import Redis, { Redis as RedisClient } from 'ioredis';

export default class RedisCache {
    protected client: RedisClient;

    constructor() {
        this.client = new Redis({
            host: 'localhost',
            port: 6379,
            username: '',
            password: '',
            db: 0
        });
    }

    public async save<T>(key: string, data: any): Promise<void> {
        this.client.set(key, JSON.stringify(data));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    public async invalidate(key): Promise<void> {
        this.client.del(key);
    }
}