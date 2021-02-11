const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        format.timestamp({
            format: 'YYYY-MMM-DD hh:mm:ss A',
            stack: true
        }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
            ),
            stack: true
        }),
        new transports.File({ filename: './logs/error.log', level: 'error' }),
    ]
});

module.exports = logger;