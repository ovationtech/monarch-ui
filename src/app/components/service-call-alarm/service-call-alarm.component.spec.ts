import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCallAlarmComponent } from './service-call-alarm.component';

describe('ServiceCallAlarmComponent', () => {
  let component: ServiceCallAlarmComponent;
  let fixture: ComponentFixture<ServiceCallAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCallAlarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCallAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
