import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipPartsOrderComponent } from './equip-parts-order.component';

describe('EquipPartsOrderComponent', () => {
  let component: EquipPartsOrderComponent;
  let fixture: ComponentFixture<EquipPartsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipPartsOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipPartsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
