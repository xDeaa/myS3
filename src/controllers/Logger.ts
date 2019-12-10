import logfmt from 'logfmt'

export default class Logger {
    public static traceLog(
        message: string,
        detail?: string,
        code?: string,
    ): void {
        this.createLog('trace', message, detail, code)
    }

    public static debugLog(
        message: string,
        detail?: string,
        code?: string,
    ): void {
        this.createLog('debug', message, detail, code)
    }

    public static infoLog(
        message: string,
        detail?: string,
        code?: string,
    ): void {
        this.createLog('info', message, detail, code)
    }

    public static warnLog(
        message: string,
        detail?: string,
        code?: string,
    ): void {
        this.createLog('warn', message, detail, code)
    }

    public static errorLog(
        message: string,
        detail?: string,
        code?: string,
    ): void {
        this.createLog('error', message, detail, code)
    }

    public static fatalLog(
        message: string,
        detail?: string,
        code?: string,
    ): void {
        this.createLog('fatal', message, detail, code)
    }

    private static checkLogLevel(statusLog: string): boolean {
        const logLevels: Record<string, number> = {
            trace: 1,
            debug: 2,
            info: 3,
            warn: 4,
            error: 5,
            fatal: 6,
        }
        const currentMinLevel: string = process.env.APP_LOG_LEVEL || 'debug'
        return logLevels[currentMinLevel] <= logLevels[statusLog]
    }

    private static createLog(
        statusLog: string,
        message: string,
        detail?: string,
        code?: string,
    ): void {
        if (!this.checkLogLevel(statusLog)) {
            return
        }

        const objectLog: Record<string, string> = {
            time: new Date().toISOString(),
            level: statusLog,
            msg: message,
        }
        if (detail !== undefined) {
            objectLog.detail = detail
        }
        if (code !== undefined) {
            objectLog.code = code
        }
        logfmt.log(objectLog, process.stdout)
    }
}
