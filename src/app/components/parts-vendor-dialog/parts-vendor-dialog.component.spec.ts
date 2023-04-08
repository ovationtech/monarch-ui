import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsVendorDialogComponent } from './parts-vendor-dialog.component';

describe('PartsVendorDialogComponent', () => {
  let component: PartsVendorDialogComponent;
  let fixture: ComponentFixture<PartsVendorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsVendorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartsVendorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
