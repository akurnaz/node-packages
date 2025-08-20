import { logger as firebaseLogger } from "firebase-functions";

export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
}

export class Logger {
    private static instance: Logger;
    private currentLogLevel: LogLevel;

    private constructor() {
        this.currentLogLevel = LogLevel.INFO;
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setLogLevel(level: LogLevel): void {
        this.currentLogLevel = level;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels = Object.values(LogLevel);
        return levels.indexOf(level) >= levels.indexOf(this.currentLogLevel);
    }

    public debug(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.DEBUG)) {
            firebaseLogger.debug(...args);
        }
    }

    public info(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.INFO)) {
            firebaseLogger.info(...args);
        }
    }

    public warn(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.WARN)) {
            firebaseLogger.warn(...args);
        }
    }

    public error(...args: unknown[]): void {
        if (this.shouldLog(LogLevel.ERROR)) {
            firebaseLogger.error(...args);
        }
    }
}

export const logger = Logger.getInstance();
