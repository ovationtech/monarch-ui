import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCallBoardComponent } from './service-call-board.component';

describe('ServiceCallBoardComponent', () => {
  let component: ServiceCallBoardComponent;
  let fixture: ComponentFixture<ServiceCallBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCallBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCallBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
