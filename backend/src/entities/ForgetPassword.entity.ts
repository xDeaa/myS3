import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import User from './User.entity'

@Entity('forget_password')
export default class ForgetPassword {
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
