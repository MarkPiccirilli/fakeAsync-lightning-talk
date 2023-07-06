import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { IServiceResponse } from '../models/service-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  constructor() { }

  public practiceServiceCall(): Observable<IServiceResponse> {
    return from(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: 'Leo is my favorite cat!!!' });
        }, 2000)
      }) 
    ) as Observable<IServiceResponse>;
  }
}
