import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    message: string;

    @CreateDateColumn({ default: () => 'NOW()', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'NOW()', type: 'timestamp' })
    updatedAt: Date;
}