export abstract class LoggerService {
  abstract debug(message: string, context?: string): void;
  abstract http(message: string): void;
  abstract log(message: string, context?: string): void;
  abstract warn(message: any, context?: string): void;
  abstract error(
    message: any,
    meta?: { trace?: string; context?: string },
  ): void;
}
