import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { validateSync } from 'class-validator';

interface ClassType<T, A extends any[] = any[]> extends Function {
  new (...args: A): T;
}

export const toProvider = (...injectClasses: ClassType<unknown>[]) => {
  return injectClasses.map((injectClass) => {
    return {
      provide: injectClass.name,
      useClass: injectClass,
    };
  });
};

export const createDto = <T>(dtoClass: new (...args: any[]) => T, obj: T) => {
  const dto = plainToInstance(dtoClass, obj);

  const errors = validateSync(dto as object);
  if (errors.length > 0) {
    throw new BadRequestException(
      errors.flatMap((error) => Object.values(error.constraints ?? [])),
    );
  }

  return dto;
};
