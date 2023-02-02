import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImobilierAchatComponent } from './imobilier-achat.component';

describe('ImobilierAchatComponent', () => {
  let component: ImobilierAchatComponent;
  let fixture: ComponentFixture<ImobilierAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImobilierAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImobilierAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
