import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallRatingComponent } from './overall-rating.component';

describe('OverallRatingComponent', () => {
  let component: OverallRatingComponent;
  let fixture: ComponentFixture<OverallRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverallRatingComponent]
    });
    fixture = TestBed.createComponent(OverallRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
