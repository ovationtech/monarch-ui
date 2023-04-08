import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptDialogComponent } from './appt-dialog.component';

describe('ApptDialogComponent', () => {
  let component: ApptDialogComponent;
  let fixture: ComponentFixture<ApptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApptDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
