import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, transactionId }) => {
      return `[${timestamp}] [${transactionId}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Add other transports like File or Http, if needed
  ],
});

export default logger;
