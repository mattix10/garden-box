import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let authServiceMock: any;
  let router: Router;
  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login'], {'registrationInfo$': of(false)});
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create LoginComponent', () => {
  authServiceMock.registrationInfo$ = of(false)
    expect(component).toBeTruthy();
  });

  describe('HTML elements', ()=> {

    it('should contain E-mail label', () => {
      const labels = fixture.debugElement.queryAll(By.css('mat-label'));
      expect(labels[0].nativeElement.textContent).toContain('E-mail');
    })

    it('should contain Hasło label', () => {
      const labels = fixture.debugElement.queryAll(By.css('mat-label'));
      expect(labels[1].nativeElement.textContent).toContain('Hasło');
    })
    
    it('should contain Rejestracja span', () => {
      const spans = fixture.debugElement.queryAll(By.css('span'));
      expect(spans[2].nativeElement.textContent).toContain('Rejestracja');
    })
  });

  describe('test formfields: ', () => {
    it('form invalid when empty', () => {
      expect(component.form.valid).toBeFalsy();
    });

    it('email field is empty', () => {
      let email = component.form.controls['email'];
      expect(email.valid).toBeFalsy();
    })

    it('email field has error required', () => {
      let errors: any = {};
      let email = component.form.controls.email;
      errors = email.errors || {};
      expect(errors.required).toBeTruthy();
    })

    it('email field has error email', () => {
      let errors: any = {};
      let email = component.form.controls.email;
      errors = email.errors || {};
      email.setValue('test@test');
      expect(errors.email).toBeFalsy();
    })
  })
  it('should touch form', () => {
    component.form.markAllAsTouched();
    expect(component.form.touched).toBe(true)
  });

  describe('login user', () => {
    it('login successful - navigate after clicked button', fakeAsync(() => {
      authServiceMock.login.and.returnValue(of({email: 'test@test', password: 'test'}))
      let email = component.form.controls['email'];
      let password = component.form.controls['password'];
      let button = fixture.debugElement.query(By.css('button'));
      email.setValue('test@test');
      password.setValue('test');
      spyOn(router, 'navigateByUrl');
      button.nativeElement.click();
      expect(component.form.status).toEqual('VALID');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/panel');
    }));

    it('login failed', fakeAsync(() => {
      authServiceMock.login.and.returnValue(throwError(new Error('error')));
      component.errorMessage = 'Nieprawidłowe dane. Spróbuj ponownie.';
      expect(component.errorMessage).toEqual('Nieprawidłowe dane. Spróbuj ponownie.')
    }));
  })
});
