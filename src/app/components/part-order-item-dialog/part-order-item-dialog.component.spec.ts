import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartOrderItemDialogComponent } from './part-order-item-dialog.component';

describe('PartOrderItemDialogComponent', () => {
  let component: PartOrderItemDialogComponent;
  let fixture: ComponentFixture<PartOrderItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartOrderItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartOrderItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
