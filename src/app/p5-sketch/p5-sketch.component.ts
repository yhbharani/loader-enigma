import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-p5-sketch',
  template: '',
  styleUrls: ['./p5-sketch.component.css']
})
export class P5SketchComponent implements OnInit, OnDestroy {
  private p5: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.createCanvas();
  }
  ngOnDestroy() {
    this.destroyCanvas();
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch, this.el.nativeElement);
  }

  private destroyCanvas() {
    this.p5.remove();
  }

  private sketch(p: any) {

    let t = 0;
    let petals = 3;
    let x1, x2, x3, x4, y1, y2, y3, y4;
    let outsize = 1000;
    let num = 0;
    let ang = p.TWO_PI / petals;

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(255);
      p.blendMode(p.BLEND);
      p.colorMode(p.HSB, 100);
    };

    p.draw = () => {
      t++;
      let radBase = p.map(p.mouseX, 0, p.width, 0, outsize / 2.4);
      if (t >= 100) {
        t = 0;
      }
      petals = p.int(p.map(p.mouseY, 0, outsize, 5, 30));
      ang = p.TWO_PI / petals;
      p.fill(100, 50, 80, 20);
      p.noFill();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(0);
      x1 = radBase + p.noise(p.frameCount * 0.01) * outsize / 5;
      x2 = radBase + p.noise(p.frameCount * 0.009) * outsize / 5;
      x3 = radBase + p.noise(p.frameCount * 0.008) * outsize / 5;
      x4 = radBase + p.noise(p.frameCount * 0.007) * outsize / 5;
      y1 = 0;
      y2 = outsize / 5 * p.noise(p.frameCount * 0.006) * p.tan(ang);
      y3 = outsize / 5 * p.noise(p.frameCount * 0.005) * p.tan(ang);
      y4 = 0;

      p.noFill();
      p.stroke(50);
      p.strokeWeight(outsize / 1000);

      for (let i = 0; i < petals; i++) {
        p.beginShape();
        p.curveVertex(x1, y1);
        p.curveVertex(x1, y1);
        p.curveVertex(x2, y2);
        p.curveVertex(x3, y3);
        p.curveVertex(x4, y4);
        p.curveVertex(x4, y4);
        p.endShape();

        p.beginShape();
        p.curveVertex(x1, -y1);
        p.curveVertex(x1, -y1);
        p.curveVertex(x2, -y2);
        p.curveVertex(x3, -y3);
        p.curveVertex(x4, -y4);
        p.curveVertex(x4, -y4);
        p.endShape();
        p.rotate(ang);
      }

      createbg();

      if (p.mouseIsPressed === true) {
        p.clear();
        p.background(255);
      }
    };

    function createbg() {
      p.blendMode(p.BLEND);
      p.fill(255, 5);
      p.noStroke();
      p.rectMode(p.CENTER);
      p.rect(0, 0, p.width, p.height, 10);
      p.blendMode(p.BLEND);
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    function watermark() {
      p.blendMode(p.BLEND);
      p.fill(0, 0, 100, 30);
      p.noStroke();
      p.textSize(18);
      p.text("Generated from \n https://mandala-khandala.web.app \n on: " + p.day() + "-" + p.month() + "-" + p.year() + " / " + p.hour() + " : " + p.minute(), p.windowWidth / 4, p.windowHeight / 3);
      p.blendMode(p.ADD);
    }

    p.keyPressed = () => {
      if (p.keyCode == 83) {
        watermark();
        p.saveCanvas("Mandala-" + num, "png");
        num++;
        p.clear();
      }
    };
  }
}
