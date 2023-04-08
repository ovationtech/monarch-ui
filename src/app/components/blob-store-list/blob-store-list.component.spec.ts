import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobStoreListComponent } from './blob-store-list.component';

describe('BlobStoreListComponent', () => {
  let component: BlobStoreListComponent;
  let fixture: ComponentFixture<BlobStoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlobStoreListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlobStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
