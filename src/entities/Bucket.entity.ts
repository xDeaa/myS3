import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { User } from './User.entity';

@Entity('bucket')
export class Bucket {
    @PrimaryGeneratedColumn()
    id: string

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar',
    })
    name: string

    @ManyToMany(type => User, user => user.buckets, {
        cascade: true
    })
    @JoinTable()
    user: User;

    toJSON = (): Record<string, string | User> => {
        return {
            id: this.id,
            name: this.name,
        }
    }
}
