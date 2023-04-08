import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerLocationComponent } from './edit-customer-location.component';

describe('EditCustomerLocationComponent', () => {
  let component: EditCustomerLocationComponent;
  let fixture: ComponentFixture<EditCustomerLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
