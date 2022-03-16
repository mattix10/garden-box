import { TestBed } from '@angular/core/testing';

import { ModeService } from './mode.service';

fdescribe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should set temperature's mode`, () => {
    service.setMode('temperature', true)
    expect(service.getMode('temperature')).toBeTrue();
  })

  it(`should set light's mode`, () => {
    service.setMode('light', true)
    expect(service.getMode('light')).toBeTrue();
  })

  it(`should set humidity's mode`, () => {
    service.setMode('humidity', true)
    expect(service.getMode('humidity')).toBeTrue();
  })

  it('should return default value', () => {
    service.setMode('any', true);
    expect(service.getMode('any')).toBeFalse();
  })
});
