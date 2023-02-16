import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImoImagesComponent } from './show-imo-images.component';

describe('ShowImoImagesComponent', () => {
  let component: ShowImoImagesComponent;
  let fixture: ComponentFixture<ShowImoImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowImoImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImoImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
