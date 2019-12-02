import dotenv from 'dotenv'
import express, { Application } from 'express'
import { createConnection } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { Logger } from './controllers/Logger'
import entities from './entities'
import { RouteBuilder } from './routes/RouterBuilder'
import 'reflect-metadata'

// Init variables ENVs
dotenv.config()
const {
    PORT = 80,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_PORT,
    MYSQL_BASE,
    APP_ENV,
    APP_LOG_LEVEL,
} = process.env

if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASS || !MYSQL_PORT || !MYSQL_BASE) {
    throw 'Missing MySQL ENVs !'
}

// Create express app
const app: Application = express()

// Init middlewares and routes
RouteBuilder.build(app)

// Create connection with database
const typeOrmConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: MYSQL_HOST,
    username: MYSQL_USER,
    password: MYSQL_PASS,
    port: parseInt(MYSQL_PORT, 10),
    database: MYSQL_BASE,
    entities: Object.values(entities),
    synchronize: true,
    insecureAuth: true,
}
createConnection(typeOrmConfig)
    .then(() => {
        app.listen(PORT, () => {
            Logger.infoLog('========= Starting myS3 API =========')
            Logger.infoLog(`PORT      = ${PORT}`)
            Logger.infoLog(`LOG LEVEL = ${APP_LOG_LEVEL}`)
            Logger.infoLog(`APP_ENV   = ${APP_ENV}`)
        })
    })
    .catch(error => console.log('TypeORM connection error: ', error))
