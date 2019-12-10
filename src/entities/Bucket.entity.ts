import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { User } from './User.entity'
import { Blob } from './Blob.entity'

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
            nullable: false,
        },
    )
    user: User

    @OneToMany(
        () => Blob,
        blob => blob.bucket,
    )
    blobs: Blob[]

    toJSON = (): object => {
        return {
            id: this.id,
            name: this.name,
        }
    }
}
