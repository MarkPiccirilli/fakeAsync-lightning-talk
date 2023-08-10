import { fakeAsync, tick } from '@angular/core/testing';
import { returnFakeObservable, returnFakePromise } from './test-util';

describe('Test Util', () => {
  it('should return the correct return value in the correct time when returnFakeObservable is called', fakeAsync(() => {
    const testReturnValue = "Test return value";
    const testTimeout = 2000;
    let expectedReturnValue = '';
    returnFakeObservable(testReturnValue, testTimeout).subscribe((result) => {
      expectedReturnValue = result;
    });
    expect(expectedReturnValue).not.toBe(testReturnValue);
    tick(testTimeout);
    expect(expectedReturnValue).toBe(testReturnValue);
  }));

  it('should return the correct return value when returnFakeObservable is called without a timeout', fakeAsync(() => {
    const testReturnValue = "Test return value";
    let expectedReturnValue = '';
    returnFakeObservable(testReturnValue).subscribe((result) => {
      expectedReturnValue = result;
    });
    expect(expectedReturnValue).not.toBe(testReturnValue);
    tick();
    expect(expectedReturnValue).toBe(testReturnValue);
  }));

  it('should return the correct return value in the correct time when returnFakePromise is called', fakeAsync(() => {
    const testReturnValue = "Test return value";
    const testTimeout = 2000;
    let expectedReturnValue = '';
    returnFakePromise(testReturnValue, testTimeout).then((result) => {
      expectedReturnValue = result;
    });
    expect(expectedReturnValue).not.toBe(testReturnValue);
    tick(testTimeout);
    expect(expectedReturnValue).toBe(testReturnValue);
  }));

  it('should return the correct return value when returnFakePromise is called without a timeout', fakeAsync(() => {
    const testReturnValue = "Test return value";
    let expectedReturnValue = '';
    returnFakePromise(testReturnValue).then((result) => {
      expectedReturnValue = result;
    });
    expect(expectedReturnValue).not.toBe(testReturnValue);
    tick();
    expect(expectedReturnValue).toBe(testReturnValue);
  }));
});
