import { getRepository, DeleteResult } from 'typeorm'
import { ResponseError } from '../models'

export default class BaseService {
    public static async baseDelete<T extends Function>(
        type: T,
        id: string | number,
        exception: ResponseError,
    ): Promise<void> {
        const deleted: DeleteResult = await getRepository(type).delete(id)

        if (!deleted || deleted.affected === 0) {
            throw exception
        }
    }
}
