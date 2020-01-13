import { getRepository } from 'typeorm'
import { User, ForgotPassword } from '../entities'
import uuid from 'uuid';

export default class ForgotPassService {
    /**
     * Find a forgot password object from token
     * @param token Token to search
     */
    public static findForgotToken(token: string): Promise<ForgotPassword | undefined> {
        return getRepository(ForgotPassword).findOne({
            where: { token },
            relations: ['user']
        });
    }

    /**
     * Create a token for forgot password
     * @param user User to associate to the forgot password
     */
    public static createForgot(user: User): Promise<ForgotPassword> {
        return getRepository(ForgotPassword).save({
            user: user,
            token: uuid.v4()
        })
    }

    /**
     * Delete token
     * @param id Id of forgot password 
     */
    public static async deleteForgot(id: number): Promise<void> {
        await getRepository(ForgotPassword).delete(id);
    }
}
