/// <reference types="jest" />

declare namespace jest {
  interface ChainedMatchers<T>
    extends jest.JestMatchersShape<
      Matchers<ChainedMatchers<T>, T>,
      Matchers<Promise<ChainedMatchers<T>>, T>
    > {}

  interface Expect {
    /**
     * The `expect` function is used every time you want to test a value.
     * You will rarely call `expect` by itself.
     *
     * @param actual The value to apply matchers against.
     */
    <T = any>(actual: T): ChainedMatchers<T>;
  }
}
