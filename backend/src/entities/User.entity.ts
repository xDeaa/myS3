import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm'
import { Bucket, ForgetPassword } from '.'

@Entity('user')
export default class User {
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

    @OneToMany(
        () => Bucket,
        bucket => bucket.user,
    )
    buckets: Bucket[]

    @OneToMany(
        () => ForgetPassword,
        forgetpass => forgetpass.user,
    )
    forgetpass: ForgetPassword[]

    toJSON = (): object => {
        return {
            uuid: this.uuid,
            nickname: this.nickname,
            email: this.email,
        }
    }
}
