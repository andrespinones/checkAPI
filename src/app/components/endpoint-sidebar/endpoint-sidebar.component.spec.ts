import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointSidebarComponent } from './endpoint-sidebar.component';

describe('EndpointSidebarComponent', () => {
  let component: EndpointSidebarComponent;
  let fixture: ComponentFixture<EndpointSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
