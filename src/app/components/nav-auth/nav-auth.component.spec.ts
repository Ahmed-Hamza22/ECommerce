import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAuthComponent } from './nav-auth.component';

describe('NabAuthComponent', () => {
  let component: NavAuthComponent;
  let fixture: ComponentFixture<NavAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
