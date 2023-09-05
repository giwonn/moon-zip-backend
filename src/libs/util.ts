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
