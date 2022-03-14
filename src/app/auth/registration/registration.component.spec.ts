import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

import { RegistrationComponent } from './registration.component';
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authServiceSpy: any;
  let router: Router;
  let authService: AuthService;
  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['registration'],  {'registrationInfo$': of(false)});
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
      ]
    })
    .compileComponents();
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create registartionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should touch form', () => {
    component.form.markAllAsTouched();
    expect(component.form.touched).toBe(true)
  });

  it('navigate user after click registry button and successfully fill form', () => {
    authServiceSpy.registration.and.returnValue(of({email: 'test@test', password: 'test'}))
    router = TestBed.inject(Router);
    let email = component.form.controls['email'];
    let password = component.form.controls['password'];
    let button = fixture.debugElement.query(By.css('button'));
    email.setValue('test@test');
    password.setValue('test');
    spyOn(router, 'navigateByUrl');
    button.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/zaloguj');
  })

  it('registration failed,', fakeAsync(() => {
  // let regi: Registration = new Registration();
  //   const spy = spyOn(regi, 'registration');
  //   spy.and.returnValue(throwError(() => new Error('err')))
    // regi.registration('test@test', 'test').subscribe(() => {
    //   console.log('here1')
    // }, (err:any) => {
    //   console.log('here')
    //   component.errorMessage = 'err'
    //   expect(component.errorMessage).toBe('err')
    // })
    // authService.registration('test@test', )
  }))

});

class Registration {
  registration(email: string, password: string): Observable<any> {
    return throwError(new Error('err'))
  }
}
