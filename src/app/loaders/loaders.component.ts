import { Component , NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loaders',
  templateUrl: './loaders.component.html', 
  styleUrls: ['./loaders.component.css']
})
export class LoadersComponent implements OnInit {

  loaderId: number=0;
  duration: number=0;

  currentPercentage: number = 0;  // This will store the current percentage

  // Mapping of loader IDs to their respective JSON paths
  private loaderPaths: { [key: number]: string } = {
    5: '/assets/loaders/hamster.json',
    6: '/assets/loaders/hamster.json',
    11: '/assets/loaders/Bear.json',
    12: '/assets/loaders/Bear.json',
  };

  showLottieAnimation: boolean = true;  // By default, show the Lottie animation

  options: AnimationOptions = {
    path: '',  // Initialize with an empty string; it will be set in ngOnInit
  };

  constructor(private route: ActivatedRoute, private router: Router, private ngZone: NgZone) { }
  

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const durationParam = this.route.snapshot.paramMap.get('duration');

    this.loaderId = idParam ? +idParam : 0;  // default to 0 if null
    this.duration = durationParam ? +durationParam : 0;  // default to 0 if null

    // Determine whether to show Lottie animation or custom div
    this.showLottieAnimation = ![1,2,3,4,7,8,9,10].includes(this.loaderId);

    if (this.showLottieAnimation) {
      // Set the path for the animation based on loaderId
      this.options = {
        path: this.loaderPaths[this.loaderId] || '/assets/loaders/Bear.json'
      } as any;
    }

    // Redirect to select-loader page after duration seconds
    setTimeout(() => {
      localStorage.setItem(`loader_${this.loaderId}_seen`, 'true');
      this.router.navigate(['/selection']);
    }, this.duration * 1000);  // Convert duration to milliseconds

    // Update the percentage over time
    const intervalTime = (this.duration * 1000) / 100;  // Calculate the interval time for each 1% increment
    let interval = setInterval(() => {
      this.currentPercentage += 1;
      if (this.currentPercentage >= 100) {
        clearInterval(interval);  // Stop the interval when it reaches 100%
      }
    }, intervalTime);
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
