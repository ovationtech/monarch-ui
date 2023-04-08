import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianItemComponent } from './technician-item.component';

describe('TechnicianItemComponent', () => {
  let component: TechnicianItemComponent;
  let fixture: ComponentFixture<TechnicianItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
