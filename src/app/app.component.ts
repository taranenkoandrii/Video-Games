import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CurrentPage } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'video_games';
  currentRoute: string = '';
  pages: typeof CurrentPage = CurrentPage;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
