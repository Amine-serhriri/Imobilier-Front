import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImobilierLocationComponent } from './imobilier-location.component';

describe('ImobilierLocationComponent', () => {
  let component: ImobilierLocationComponent;
  let fixture: ComponentFixture<ImobilierLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImobilierLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImobilierLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
