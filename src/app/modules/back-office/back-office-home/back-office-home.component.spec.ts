import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeHomeComponent } from './back-office-home.component';

describe('BackOfficeHomeComponent', () => {
  let component: BackOfficeHomeComponent;
  let fixture: ComponentFixture<BackOfficeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
