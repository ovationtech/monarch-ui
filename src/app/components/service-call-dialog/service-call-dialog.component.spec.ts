import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCallDialogComponent } from './service-call-dialog.component';

describe('ServiceCallDialogComponent', () => {
  let component: ServiceCallDialogComponent;
  let fixture: ComponentFixture<ServiceCallDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCallDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
