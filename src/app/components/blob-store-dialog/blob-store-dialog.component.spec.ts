import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobStoreDialogComponent } from './blob-store-dialog.component';

describe('BlobStoreDialogComponent', () => {
  let component: BlobStoreDialogComponent;
  let fixture: ComponentFixture<BlobStoreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlobStoreDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlobStoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
