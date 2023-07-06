import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { from, Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { IServiceResponse } from './models/service-response.interface';
import { PracticeService } from './services/practice.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: PracticeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(PracticeService);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

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
  }));
});
