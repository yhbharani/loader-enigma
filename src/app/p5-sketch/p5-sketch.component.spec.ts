import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P5SketchComponent } from './p5-sketch.component';

describe('P5SketchComponent', () => {
  let component: P5SketchComponent;
  let fixture: ComponentFixture<P5SketchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P5SketchComponent]
    });
    fixture = TestBed.createComponent(P5SketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
