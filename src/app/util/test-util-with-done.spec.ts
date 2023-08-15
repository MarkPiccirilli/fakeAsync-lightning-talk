import { returnFakeObservable, returnFakePromise } from './test-util';

//these tests can be slow because you have to wait for the asynchronous calls to complete
describe('Test Util with done', () => {
  it('should return the correct return value in the correct time when returnFakeObservable is called', (done) => {
    const testReturnValue = "Test return value";
    const testTimeout = 2000;
    returnFakeObservable(testReturnValue, testTimeout).subscribe((result) => {
      expect(result).toBe(testReturnValue);
      done();
    });
  });

  it('should return the correct return value when returnFakeObservable is called without a timeout', (done) => {
    const testReturnValue = "Test return value";
    returnFakeObservable(testReturnValue).subscribe((result) => {
      expect(result).toBe(testReturnValue);
      done();
    });
  });

  it('should return the correct return value in the correct time when returnFakePromise is called', (done) => {
    const testReturnValue = "Test return value";
    const testTimeout = 2000;
    returnFakePromise(testReturnValue, testTimeout).then((result) => {
      expect(result).toBe(testReturnValue);
      done();
    });
  });

  it('should return the correct return value when returnFakePromise is called without a timeout', (done) => {
    const testReturnValue = "Test return value";
    returnFakePromise(testReturnValue).then((result) => {
      expect(result).toBe(testReturnValue);
      done();
    });
  });
});
