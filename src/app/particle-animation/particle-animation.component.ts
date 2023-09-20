import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-particle-animation',
  templateUrl: './particle-animation.component.html',
  styleUrls: ['./particle-animation.component.css']
})

export class ParticleAnimationComponent implements AfterViewInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particleArray: Particle[] = [];
  private adjustX = 10;
  private adjustY = 10;
  private mouse = {
    x: null as any,
    y: null as any,
    radius: 150
  };

  constructor(private el: ElementRef) {
    // Bind the functions in the constructor
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.animate = this.animate.bind(this);
  }

  ngAfterViewInit() {
    this.canvas = this.el.nativeElement.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Use the bound functions directly
    window.addEventListener('mousemove', this.handleMouseMove);
    this.init();
    this.animate();
  }

  ngOnDestroy() {
    // Use the bound functions directly
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(event: MouseEvent) {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }


  init() {
    this.particleArray = [];
    this.ctx.fillStyle = 'white';
    this.ctx.font = "3em sans-serif";
    this.ctx.fillText("Loading", 240, 140);
    const textCoordinates = this.ctx.getImageData(0, 0, 1200, 800);
    const stepSize = 2; // Adjust this value as needed
    const maxParticles = 2000; // Adjust this value as needed

    for (let y = 0, y2 = textCoordinates.height; y < y2; y+=stepSize) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x+=stepSize) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + this.adjustX;
                let positionY = y + this.adjustY;
                this.particleArray.push(new Particle(positionX * 2.2, positionY * 2.2, this.ctx, this.mouse));
                if (this.particleArray.length >= maxParticles) {
                    break;
                }
            }
        }
        if (this.particleArray.length >= maxParticles) {
            break;
        }
    }
}

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.particleArray.length; i++) {
      this.particleArray[i].draw();
      this.particleArray[i].update();
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}

class Particle {
  private baseX: number;
  private baseY: number;
  private density: number;

  constructor(private x: number, private y: number, private ctx: CanvasRenderingContext2D, private mouse: any) {
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 15) + 5;
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update() {
    let dx = this.mouse.x - this.x;
    let dy = this.mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = this.mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < this.mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 5;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 5;
      }
    }
  }
}