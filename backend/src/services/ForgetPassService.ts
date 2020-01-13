import { getRepository } from 'typeorm'
import { User, ForgetPassword } from '../entities'
import uuid from 'uuid';

export default class ForgetPassService {
    /**
     * Find a forget password object from token
     * @param token Token to search
     */
    public static findForgetToken(token: string): Promise<ForgetPassword | undefined> {
        return getRepository(ForgetPassword).findOne({
            where: { token },
            relations: ['user']
        });
    }

    /**
     * Create a token for forget password
     * @param user User to associate to the forget password
     */
    public static createForget(user: User): Promise<ForgetPassword> {
        return getRepository(ForgetPassword).save({
            user: user,
            token: uuid.v4()
        })
    }

    /**
     * Delete token
     * @param id Id of forget password 
     */
    public static async deleteForget(id: number): Promise<void> {
        await getRepository(ForgetPassword).delete(id);
    }
}
