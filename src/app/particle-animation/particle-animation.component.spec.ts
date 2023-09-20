import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleAnimationComponent } from './particle-animation.component';

describe('ParticleAnimationComponent', () => {
  let component: ParticleAnimationComponent;
  let fixture: ComponentFixture<ParticleAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticleAnimationComponent]
    });
    fixture = TestBed.createComponent(ParticleAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
