import { logger } from "./logger";

export const throwErrorTec = (
  message: string,
  error?: unknown,
  context?: Record<string, any>,
) => {
  const log = {
    message,
    error: error instanceof Error ? error.stack : error,
    context,
  };

  console.error(message, error);
  logger.error(log);

  throw new Error(message);
};
