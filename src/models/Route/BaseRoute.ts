import { Router } from 'express'

export class BaseRoute {
    public router = Router()

    constructor() {
        if (new.target === BaseRoute) {
            throw 'Cannot create an instance of an abstract class'
        }
        this.initializeRoutes()
    }

    public initializeRoutes() {
        throw 'You must implement this function !'
    }
}
