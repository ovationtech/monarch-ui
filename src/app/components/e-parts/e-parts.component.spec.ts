import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPartsComponent } from './e-parts.component';

describe('EPartsComponent', () => {
  let component: EPartsComponent;
  let fixture: ComponentFixture<EPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EPartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
