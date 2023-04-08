import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDialogComponent } from './vendor-dialog.component';

describe('VendorDialogComponent', () => {
  let component: VendorDialogComponent;
  let fixture: ComponentFixture<VendorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
