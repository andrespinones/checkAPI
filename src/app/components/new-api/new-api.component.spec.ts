import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApiComponent } from './new-api.component';

describe('NewApiComponent', () => {
  let component: NewApiComponent;
  let fixture: ComponentFixture<NewApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
