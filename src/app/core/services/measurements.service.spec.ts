import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Measurement } from '../interfaces/Measurement';

import { MeasurementsService } from './measurements.service';

fdescribe('MeasurementsService', () => {
  let measurementsService: MeasurementsService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const testUrl = `${environment.API_URL}`;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        MeasurementsService
      ]
    });
    measurementsService = TestBed.inject(MeasurementsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(measurementsService).toBeTruthy();
  });

  it('should get 1 light measurement', () => {
    const measurements: Measurement[] = [{value: 12, createdAt: '2021-12-09 20:00:00'}];
    const params = new HttpParams().set('limit', 1);

		httpClientSpy.get.and.returnValue(of(measurements)
      .pipe(map(data => {
        return data.map((measurement: Measurement) => {
          return measurement;
        });
      }))
    );
    measurementsService.getMeasurement('light', 1)
      .subscribe((measurements: Measurement[]) => {
        expect(measurements)
          .withContext('to be true')
          .toBeTruthy();

        expect(measurements.length)
          .withContext('expected to be greater than 0')
          .toBeGreaterThan(0);
    });


    const req = httpTestingController.expectOne(testUrl + '/light/oneDay?limit=1');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toEqual(params.get('limit'));

    req.flush(measurements);
  });

  it('should get 1 light measurement of specific day', () => {
    const measurements: Measurement[] = [{value: 12, createdAt: '2021-12-09 20:00:00'}];
    const date = '2021-12-09'
    const params = new HttpParams().set('date', date);

		httpClientSpy.get.and.returnValue(of(measurements)
      .pipe(map(data => {
        return data.map((measurement: Measurement) => {
          return measurement;
        });
      }))
    );
    
    measurementsService.getDateMeasurement('light', date)
      .subscribe((measurements: Measurement[]) => {
        expect(measurements)
          .withContext('to be true')
          .toBeTruthy();

        expect(measurements.length)
          .withContext('expected to be greater than 0')
          .toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(testUrl + '/light?date=2021-12-09');

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('date')).toEqual(params.get('date'));

    req.flush(measurements)

  });
});
