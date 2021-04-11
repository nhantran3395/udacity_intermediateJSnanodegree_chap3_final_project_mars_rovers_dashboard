const { createLogger, format, transports } = require('winston');

const { timestamp, combine, printf, errors } = format;

const env = process.env.ENVIRONMENT;

const logFormat = printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`,
);

const logger = createLogger({
  level: env === 'production' ? 'info' : 'debug',
  format: combine(
    env === 'production' ? format.uncolorize() : format.colorize(),
    env === 'production'
      ? timestamp()
      : timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat,
  ),
  transports: [new transports.Console()],
});

logger.stream = {
  write: (message, encoding) => logger.info(message),
};

module.exports = logger;
