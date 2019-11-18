import parser from 'body-parser'
import compression from 'compression'
import { Router } from 'express'

export const handleBodyRequestParsing = (router: Router): void => {
    router.use(parser.urlencoded({ extended: true }))
    router.use(parser.json())
}

export const handleCompression = (router: Router): void => {
    router.use(compression())
}
