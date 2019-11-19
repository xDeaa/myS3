import { getManager } from 'typeorm'
import uuid from 'uuid'
import { User } from '../entities'

export class UserService {
    /**
     * Find all users
     */
    public static async getAllUsers(): Promise<User[]> {
        return getManager()
            .getRepository(User)
            .find()
    }

    /**
     * Find a specific user
     * @param uuid UUID of the user to retrieve
     */
    public static async getUser(uuid: string): Promise<User | null> {
        const userFound = await getManager()
            .getRepository(User)
            .findOne(uuid)

        if (userFound) return userFound
        return null
    }

    /**
     * Save a new User
     * @param nickname Nickname of the new user
     * @param email Email of the new user
     * @param password Password encrypted of the new user
     */
    public static async saveUser(
        nickname: string,
        email: string,
        password: string,
    ): Promise<User> {
        const user: User = new User()
        user.uuid = uuid.v4()
        user.nickname = nickname
        user.email = email
        user.password = password

        return await getManager()
            .getRepository(User)
            .save(user)
    }
}
