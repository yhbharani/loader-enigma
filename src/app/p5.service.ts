import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class P5Service {

  initSketch() {
    if (typeof window !== 'undefined' && (window as any).p5) {
      new (window as any).p5();
    }
  }
  
  constructor() { }
}
