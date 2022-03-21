import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDataComponent } from './empty-data.component';

fdescribe('EmptyDataComponent', () => {
  let component: EmptyDataComponent;
  let fixture: ComponentFixture<EmptyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set message', () => {
    component['setMessage']();
    expect(component.message).toEqual('Brak danych do wyświetlenia.')
  })

  it('should spyOn the private method setMessage', () => {
    let spy = spyOn<any>(component, 'setMessage');
    component['setMessage']();
    expect(spy).toHaveBeenCalled();
  })
});
