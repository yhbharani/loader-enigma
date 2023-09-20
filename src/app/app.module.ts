import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { LoadersComponent } from './loaders/loaders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { P5SketchComponent } from './p5-sketch/p5-sketch.component';
import { ParticleAnimationComponent } from './particle-animation/particle-animation.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SelectionPageComponent,
    LoadersComponent,
    P5SketchComponent,
    ParticleAnimationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
