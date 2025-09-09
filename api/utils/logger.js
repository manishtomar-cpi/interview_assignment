import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: undefined,
  redact: {
    paths: ["req.headers.cookie", "req.headers.authorization"], // hide sensitive fields
    censor: "***",
  },
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            singleLine: true,
            ignore: "pid,hostname",
          },
        }
      : undefined,
});
