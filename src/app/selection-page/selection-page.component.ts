import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.css']
})
export class SelectionPageComponent implements OnInit {

  loaders = [
    { id: 1, thumbnail: 'assets/thumbnail.gif', name: 'Loader 1', duration: 10, seen: false },
    { id: 2, thumbnail: 'assets/thumbnail.gif', name: 'Loader 2', duration: 10, seen: false },
    { id: 3, thumbnail: 'assets/thumbnail.gif', name: 'Loader 3', duration: 10, seen: false },
    { id: 4, thumbnail: 'assets/thumbnail.gif', name: 'Loader 4', duration: 10, seen: false },
    { id: 5, thumbnail: 'assets/thumbnail.gif', name: 'Loader 5', duration: 10, seen: false },
    { id: 6, thumbnail: 'assets/thumbnail.gif', name: 'Loader 6', duration: 10, seen: false },
    { id: 7, thumbnail: 'assets/thumbnail.gif', name: 'Loader 7', duration: 10, seen: false },
    { id: 8, thumbnail: 'assets/thumbnail.gif', name: 'Loader 8', duration: 10, seen: false },
  ];

  isHover: boolean = false;

  
  constructor(private router: Router) { }

  selectLoader(id: number, duration: number) {
    this.router.navigate(['/loaders', id, duration]);
  }

  resetSession() {
    this.loaders.forEach(loader => {
      loader.seen = false;
      localStorage.removeItem(`loader_${loader.id}_seen`);
    });
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loaders.forEach(loader => {
      loader.seen = localStorage.getItem(`loader_${loader.id}_seen`) === 'true';
    });
  }


}
