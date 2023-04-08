import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceCallComponent } from './edit-service-call.component';

describe('EditServiceCallComponent', () => {
  let component: EditServiceCallComponent;
  let fixture: ComponentFixture<EditServiceCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServiceCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
