import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipPartsOrderDialogComponent } from './equip-parts-order-dialog.component';

describe('EquipPartsOrderDialogComponent', () => {
  let component: EquipPartsOrderDialogComponent;
  let fixture: ComponentFixture<EquipPartsOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipPartsOrderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipPartsOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
