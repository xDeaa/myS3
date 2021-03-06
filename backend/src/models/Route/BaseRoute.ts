import { Router } from 'express'

export default class BaseRoute {
    public router = Router({
        mergeParams: true,
    })

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
