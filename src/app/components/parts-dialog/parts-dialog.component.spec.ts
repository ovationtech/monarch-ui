import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsDialogComponent } from './parts-dialog.component';

describe('PartsDialogComponent', () => {
  let component: PartsDialogComponent;
  let fixture: ComponentFixture<PartsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
