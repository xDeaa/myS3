import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class User {
    @PrimaryColumn({
        nullable: false,
        unique: true,
    })
    uuid: string

    @Column({
        nullable: false,
        unique: true,
    })
    nickname: string

    @Column({
        nullable: false,
        unique: true,
    })
    email: string

    @Column({ nullable: false })
    password: string
}
