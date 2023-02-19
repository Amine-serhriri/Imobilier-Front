import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatDetailsComponent } from './achat-details.component';

describe('AchatDetailsComponent', () => {
  let component: AchatDetailsComponent;
  let fixture: ComponentFixture<AchatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
