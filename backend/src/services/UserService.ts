import { getRepository } from 'typeorm'
import { User } from '../entities'
import {
    AlreadyUserExistsException,
    UserNotExistsException
} from '../models/Exception'
import { BaseService } from '.'

export default class UserService {
    /**
     * Save a new User
     * @param nickname Nickname of the new user
     * @param email Email of the new user
     * @param password Password encrypted of the new user
     */
    public static async saveUser(user: User): Promise<User> {
        const exist: number = await getRepository(User).count({
            where: [{ nickname: user.nickname }, { email: user.email }],
        })

        if (exist > 0) {
            throw new AlreadyUserExistsException()
        }

        return getRepository(User).save(user)
    }

    /**
     * Update a specific user
     * @param user User to update
     */
    public static updateUser(user: User): Promise<User> {
        return getRepository(User).save(user)
    }

    /**
     * Delete a specific user
     * @param user User to delete
     */
    public static deleteUser(user: User): Promise<void> {
        return BaseService.baseDelete(
            User,
            user.uuid,
            new UserNotExistsException(),
        )
    }

    /**
     * Find all users
     */
    public static getAllUsers(): Promise<User[]> {
        return getRepository(User).find()
    }

    /**
     * Find a specific user
     * @param uuid UUID of the user to retrieve
     */
    public static async getUser(uuid: string): Promise<User> {
        const userFound = await getRepository(User).findOne(uuid)

        if (!userFound) {
            throw new UserNotExistsException()
        }

        return userFound
    }

    /**
     * Find a specific user with email
     * @param email Email of the user to retrieve
     */
    public static getUserEmail(email: string): Promise<User | undefined> {
        return getRepository(User).findOne({ email })
    }
}
