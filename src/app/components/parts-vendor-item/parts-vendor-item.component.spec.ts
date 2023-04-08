import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsVendorItemComponent } from './parts-vendor-item.component';

describe('PartsOrderItemComponent', () => {
  let component: PartsVendorItemComponent;
  let fixture: ComponentFixture<PartsVendorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsVendorItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartsVendorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
