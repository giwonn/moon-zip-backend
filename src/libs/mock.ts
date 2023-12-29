type MockedFunction<T> = T extends (...args: any[]) => any
  ? jest.Mock<ReturnType<T>, Parameters<T>>
  : never;

type MockedService<T> = {
  [P in keyof T]: MockedFunction<T[P]>;
};

export function createMockService<T>(
  service: new (...args: any[]) => T,
): MockedService<T> {
  const prototype = service.prototype;

  return Object.getOwnPropertyNames(prototype)
    .filter(
      (prop) => typeof prototype[prop] === 'function' && prop !== 'constructor',
    )
    .reduce((mock, method) => {
      // 타입 단언(type assertion)을 사용하여 에러를 해결
      mock[method] = jest.fn();
      return mock;
    }, {} as MockedService<T>);
}
