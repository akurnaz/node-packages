"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = exports.LogLevel = void 0;
const firebase_functions_1 = require("firebase-functions");
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor() {
        this.currentLogLevel = LogLevel.INFO;
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    setLogLevel(level) {
        this.currentLogLevel = level;
    }
    shouldLog(level) {
        const levels = Object.values(LogLevel);
        return levels.indexOf(level) >= levels.indexOf(this.currentLogLevel);
    }
    debug(...args) {
        if (this.shouldLog(LogLevel.DEBUG)) {
            firebase_functions_1.logger.debug(...args);
        }
    }
    info(...args) {
        if (this.shouldLog(LogLevel.INFO)) {
            firebase_functions_1.logger.info(...args);
        }
    }
    warn(...args) {
        if (this.shouldLog(LogLevel.WARN)) {
            firebase_functions_1.logger.warn(...args);
        }
    }
    error(...args) {
        if (this.shouldLog(LogLevel.ERROR)) {
            firebase_functions_1.logger.error(...args);
        }
    }
}
exports.Logger = Logger;
exports.logger = Logger.getInstance();
