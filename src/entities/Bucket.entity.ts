import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User.entity'

@Entity('bucket')
export class Bucket {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        type: 'varchar',
    })
    name: string

    @ManyToOne(
        () => User,
        user => user.buckets,
        {
            cascade: true,
        },
    )
    user: User

    toJSON = (): Record<string, string | number> => {
        return {
            id: this.id,
            name: this.name,
        }
    }
}
