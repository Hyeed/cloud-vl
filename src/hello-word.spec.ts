import { helloWorld } from './hello-world';

describe('typeScript test suite', () => {
  it('should return "Hello world!"', () => {
    // Needed when testing asynchronous code, to make sure all methods are actually called.
    expect.assertions(1);
    expect(helloWorld()).toBe('Hello, World!');
  });
});
