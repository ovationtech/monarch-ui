import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartsOrderDialogComponent } from './edit-parts-order-dialog.component';

describe('EditPartsOrderDialogComponent', () => {
  let component: EditPartsOrderDialogComponent;
  let fixture: ComponentFixture<EditPartsOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartsOrderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPartsOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
