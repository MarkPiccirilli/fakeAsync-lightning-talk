import { Observable, from } from "rxjs";

export const returnFakeObservable = (returnValue: any, timeout: number = 0): Observable<any> => {
    return from(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(returnValue);
          }, timeout)
        }) 
      );
}

export const returnFakePromise = (returnValue: any, timeout: number = 0): Promise<any> => {
  return new Promise((resolve) => {
        setTimeout(() => {
          resolve(returnValue);
        }, timeout)
      }) 
}