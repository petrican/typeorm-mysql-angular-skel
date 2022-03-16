import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoginWrapperComponent } from './app-login-wrapper.component';

describe('AppLoginWrapperComponent', () => {
  let component: AppLoginWrapperComponent;
  let fixture: ComponentFixture<AppLoginWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLoginWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
