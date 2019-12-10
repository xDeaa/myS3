import { Application, NextFunction, Request, Response } from 'express'
import logfmt from 'logfmt'
import { handleBaseMiddleware } from '../middlewares/common'
import { ResponseError } from '../models'
import { InternalErrorException } from '../models/Exception'
import ApiRouter from './ApiRouter'

export class RouteBuilder {
    public static build(app: Application): void {
        // Apply middlewares
        handleBaseMiddleware(app)
        
        if (process.env.NODE_ENV !== 'production') {
            app.use(logfmt.requestLogger())
        }
        
        app.use('/api', ApiRouter)
        app.use(RouteBuilder.catchErrors, RouteBuilder.route404)
    }

    private static catchErrors(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err: any,
        _: Request,
        res: Response,
        next: NextFunction,
    ): void {
        if (err) {
            if (err instanceof ResponseError) {
                return err.sendJson(res)
            }
            if (process.env.APP_ENV === 'debug') {
                return new InternalErrorException(`${err}`, err.stack).sendJson(
                    res,
                )
            }
            return new InternalErrorException(err.stack).sendJson(res)
        }
        next()
    }

    private static route404(req: Request, res: Response): void {
        return new ResponseError(
            404,
            'page_not_found',
            `No route found for ${req.method} ${req.url}`,
        ).sendJson(res)
    }
}
