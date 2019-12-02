import { Column, Entity, PrimaryColumn, ManyToMany } from 'typeorm'
import { Bucket } from './Bucket.entity'

@Entity('user')
export class User {
    @PrimaryColumn({
        nullable: false,
        unique: true,
        type: 'varchar',
    })
    uuid: string

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar',
    })
    nickname: string

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar',
    })
    email: string

    @Column({
        nullable: false,
        type: 'varchar',
    })
    password: string

    @ManyToMany(type => Bucket, bucket => bucket.user)
    buckets: Bucket[];

    toJSON = (): Record<string, string | Bucket[]> => {
        return {
            uuid: this.uuid,
            nickname: this.nickname,
            email: this.email,
            buckets: this.buckets,
        }
    }
}
