import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Bucket } from '.'
import { join } from 'path'

@Entity('blob')
export default class Blob {
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
            nullable: false,
        },
    )
    bucket: Bucket

    getFullPath = (): string => join(this.path, this.name)

    toJSON = (): object => {
        return {
            id: this.id,
            name: this.name,
            path: this.path,
            size: this.size,
        }
    }

    duplicate = (): Blob => {
        const blob = new Blob()
        blob.name = this.name
        blob.path = this.path
        blob.size = this.size
        blob.bucket = this.bucket

        return blob
    }
}
