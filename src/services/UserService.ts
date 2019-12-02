import { hashPassword } from './../utils/Utils';
import { getManager } from 'typeorm'
import uuid from 'uuid'
import { User } from '../entities'
import { AlreadyUserExistsException, UserNotExistsException } from '../models/Exception'

export default class UserService {
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
    public static async getUser(uuid: string): Promise<User> {
        const userFound = await getManager()
            .getRepository(User)
            .findOne(uuid)

        if (!userFound) {
            throw new UserNotExistsException();
        }

        return userFound
    }


    /**
     * Delete a specific user
     * @param uuid UUID of the user to delete
     */
    public static async deleteUser(uuid: string): Promise<void> {
        const userFound = await getManager()
            .getRepository(User)
            .findOne(uuid)

        if (!userFound) {
            throw new UserNotExistsException();
        }

        await getManager().getRepository(User).delete(uuid)
    }

    /**
     * Update a specific user
     * @param uuid UUID of the user to update
     */
    public static async updateUser(uuid: string, nickname: string, email: string, password: string): Promise<User> {
        const userFound = await getManager()
            .getRepository(User)
            .findOne(uuid)

        if (!userFound) {
            throw new UserNotExistsException();
        }

        if (nickname) {
            userFound.nickname = nickname
        }
        if (email) {
            userFound.email = email
        }
        if (password) {
            userFound.password = await hashPassword(password)
        }

        return getManager().getRepository(User).save(userFound)
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
        const isExists = await UserService.checkUser(nickname, email)
        if (isExists) {
            throw new AlreadyUserExistsException()
        }

        const user: User = new User()
        user.uuid = uuid.v4()
        user.nickname = nickname
        user.email = email
        user.password = password

        return await getManager()
            .getRepository(User)
            .save(user)
    }

    /**
     * Check if user exists
     * @param nickname Nickname of the new user
     * @param email Email of the new user
     */
    public static async checkUser(
        nickname: string,
        email: string,
    ): Promise<boolean> {
        const countUser = await getManager()
            .getRepository(User)
            .count({
                where: [{ nickname }, { email }],
            })
        return countUser > 0
    }
}
