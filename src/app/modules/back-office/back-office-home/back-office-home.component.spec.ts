import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeDashboardComponent } from './back-office-home.component';

describe('BackOfficeDashboardComponent', () => {
  let component: BackOfficeDashboardComponent;
  let fixture: ComponentFixture<BackOfficeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
