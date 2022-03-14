import {HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { defer } from 'rxjs';
import { User } from '../interfaces/User';
import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  let localStore;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        AuthService,
        // {provide:AuthService, useValue: authService},
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: Router, useValue: routerSpy}
      ]
    });
    authService = TestBed.inject(AuthService);
    // authService = new AuthService(httpClientSpy, routerSpy);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return expected user after login', () => {
    const randomUser : User = {email: 'test@test', password: 'password'}

    httpClientSpy.post.and.returnValue(asyncData(randomUser));

    authService.login('test@test', 'password').subscribe({
      next: user => {
        expect(user).toEqual(randomUser)
      }
    })

    expect(httpClientSpy.post.calls.count())
      .withContext(' one call')
      .toBe(1);
  })

  it('should return expected user after registration', () => {
    const randomUser : User = {email: 'test@test', password: 'password'}

    httpClientSpy.post.and.returnValue(asyncData(randomUser));

    authService.registration('test@test', 'password').subscribe({
      next: user => {
        expect(user).toEqual(randomUser)
      }
    })

    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  })

  it('should navigate user to logout view after logout', () => {
    authService.logout();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/logout');
  })

  it('should clear localStorage after logout', () => {
    localStore = {};
    authService.logout();
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
    expect(localStore).toEqual({})
  })
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}