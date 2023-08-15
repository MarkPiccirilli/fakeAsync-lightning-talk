import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { from, Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { IServiceResponse } from './models/service-response.interface';
import { PracticeService } from './services/practice.service';
import { returnFakeObservable } from './util/test-util';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: PracticeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(PracticeService);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  
  //the following two tests are not ideal because you have to explicitly set the isLoading class variable.
  //the component should be setting this variable
  it("should display the loading spinner if data is loading", () => {
    component.isLoading = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeTruthy(); 
  });

  it("should not display the loading spinner if data is finished loading loading", () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeFalsy();    
  });

  it('should display the data after the service call completes', () => {
    const testReturnValue: IServiceResponse = { data: 'test return value' };
    spyOn(service, 'practiceServiceCall').and.returnValue(of(testReturnValue));
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('#display-data-id').textContent
      ).toBe(testReturnValue.data);
  });

  it('should display the loading spinner when loading and then display the loaded data when complete', fakeAsync(() => {
    const testReturnValue: IServiceResponse = { data: 'test return value' };
    const timeout = 1000;
    spyOn(service, 'practiceServiceCall').and.callFake(() => {
      return from(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(testReturnValue);
          }, timeout)
        }) 
      ) as Observable<IServiceResponse>;
    });
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeTruthy();
    tick(500);
    fixture.detectChanges(); 
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeTruthy(); 
    tick(500);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeFalsy();    
    expect(
      fixture.debugElement.nativeElement.querySelector('#display-data-id').textContent
    ).toBe(testReturnValue.data);
    flush();
  }));

  it('should display the loading spinner when loading and then display the loaded data when complete', fakeAsync(() => {
    const testReturnValue: IServiceResponse = { data: 'test return value' };
    spyOn(service, 'practiceServiceCall').and.callFake(() => {
      return from(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(testReturnValue);
          })
        }) 
      ) as Observable<IServiceResponse>;
    });
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeTruthy();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeFalsy();    
    expect(
      fixture.debugElement.nativeElement.querySelector('#display-data-id').textContent
    ).toBe(testReturnValue.data);
    flush();
  }));

  it('should display the loading spinner when loading and then display the loaded data when complete (util function)', fakeAsync(() => {
    const testReturnValue: IServiceResponse = { data: 'test return value' };
    const timeout = 1000;
    spyOn(service, 'practiceServiceCall').and.callFake(() => returnFakeObservable(testReturnValue, timeout));
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeTruthy();
    tick(500);
    fixture.detectChanges(); 
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeTruthy(); 
    tick(500);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeFalsy();    
    expect(
      fixture.debugElement.nativeElement.querySelector('#display-data-id').textContent
    ).toBe(testReturnValue.data);
    flush();
  }));

  it('should display the loading spinner when loading and then display the loaded data when complete', fakeAsync(() => {
    const testReturnValue: IServiceResponse = { data: 'test return value' };
    spyOn(service, 'practiceServiceCall').and.callFake(() => returnFakeObservable(testReturnValue));
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeTruthy();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#loading-spinner-id')).toBeFalsy();    
    expect(
      fixture.debugElement.nativeElement.querySelector('#display-data-id').textContent
    ).toBe(testReturnValue.data);
    flush();
  }));
});
