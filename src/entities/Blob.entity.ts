import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Bucket } from './Bucket.entity'

@Entity('blob')
export class Blob {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        type: 'varchar',
    })
    name: string

    @Column({
        nullable: false,
        type: 'varchar',
    })
    path: string

    @Column({
        nullable: false,
        type: 'bigint',
    })
    size: number

    @ManyToOne(
        () => Bucket,
        bucket => bucket.blobs,
        {
            cascade: true,
        },
    )
    bucket: Bucket

    toJSON = (): Record<string, any> => {
        return {
            id: this.id,
            name: this.name,
            path: this.path,
            size: this.size,
        }
    }
}
