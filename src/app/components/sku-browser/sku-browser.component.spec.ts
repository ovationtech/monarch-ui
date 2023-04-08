import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuBrowserComponent } from './sku-browser.component';

describe('SkuBrowserComponent', () => {
  let component: SkuBrowserComponent;
  let fixture: ComponentFixture<SkuBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
