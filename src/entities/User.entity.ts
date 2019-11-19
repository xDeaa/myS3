import { Column, Entity, PrimaryColumn } from 'typeorm'

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

    toJSON = (): Record<string, string> => {
        return {
            uuid: this.uuid,
            nickname: this.nickname,
            email: this.email,
        }
    }
}
