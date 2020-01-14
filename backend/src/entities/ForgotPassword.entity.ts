import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import User from './User.entity'

@Entity('forgot_password')
export default class ForgotPassword {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        () => User,
        user => user.uuid,
        {
            cascade: true,
            nullable: false,
        },
    )
    user: User

    @Column({
        nullable: false,
        unique: true,
        type: 'varchar',
    })
    token: string
}
