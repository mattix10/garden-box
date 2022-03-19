import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/User';
import { MyAccountService } from './my-account.service';

xdescribe('MyAccountService', () => {
  let service: MyAccountService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpTestingController: HttpTestingController;
  const testUrl = `${environment.API_URL}`;
  let httpClient: HttpClient;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientTestingModule],
      providers: [MyAccountService,
        {provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(MyAccountService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should create MyAccountService', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', () => {
    const user: User = {
      email: 'test@test.com',
      password: 'mypassword'
    }

    httpClientSpy.get.and.returnValue(of(user));

    service.getUserData()
      .subscribe((user: User) => {
        expect(user)
          .withContext('to be true')
          .toBeTruthy();

        expect(user)
          .withContext('expected to be user')
          .toEqual(user);
    });

    const req = httpTestingController.expectOne(testUrl + '/user');
    expect(req.request.method).toBe('GET');

    req.flush(user);
  })

  it('should return user after change password', () => {
    const user: User = {
      email: 'test@test.com',
      password: 'mypassword'
    }

    const newPassword = 'newpassword'

    httpClientSpy.put.and.returnValue(of(user));

    service.editPassword(user.email,newPassword)
      .subscribe((user: User) => {
        expect(user)
          .withContext('to be true')
          .toBeTruthy();

        expect(user)
          .withContext('expected to be user')
          .toEqual(user);
    });

    const req = httpTestingController.expectOne(testUrl + '/user');
    expect(req.request.method).toBe('put');
    expect(req.request.body).toEqual(user);
    req.flush(user);
  })
});
