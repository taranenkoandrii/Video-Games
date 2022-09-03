import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import {
  VideoGamesFilterInterface,
  VideoGamesInterface,
} from 'src/app/models/models';
import { VideoGamesService } from 'src/app/services/video-games.service';

@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.scss'],
})
export class VideoGamesComponent implements OnInit {
  games$: Observable<VideoGamesInterface[]> = new Observable<
    VideoGamesInterface[]
  >();
  filteredGames$: Observable<VideoGamesInterface[]> = new Observable<
    VideoGamesInterface[]
  >();
  filterForm: FormGroup = this.fb.group({
    gameName: [''],
    gameRating: [''],
    orderName: [''],
    order: [''],
  });
  orderByOptions: string[] = ['Release Date', 'Score', 'Name'];
  orderIcon: boolean = true;

  constructor(
    private videoGamesService: VideoGamesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getGames();

    this.filteredGames$ = this.games$;

    this.filterForm.valueChanges.subscribe((val: VideoGamesFilterInterface) => {
      this.filterGames(val);

      if (val.orderName) {
        this.sortGames(val.orderName);
      }
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.getGames();
  }

  changeOrderIcon(): void {
    this.orderIcon = !this.orderIcon;
    this.filterForm.controls['order'].setValue(this.orderIcon);
  }

  sortGames(order: string): void {
    this.filteredGames$ = this.filteredGames$.pipe(
      map((games: VideoGamesInterface[]) => {
        const orderSign = this.orderIcon ? 1 : -1;
        switch (order) {
          case 'Score':
            return games.sort(
              (a: VideoGamesInterface, b: VideoGamesInterface) =>
                orderSign * (a.rating - b.rating)
            );
          case 'Name':
            return games.sort((a: VideoGamesInterface, b: VideoGamesInterface) =>
              a.name.toLowerCase() < b.name.toLowerCase()
                ? -1 * orderSign
                : a.name.toLowerCase() > b.name.toLowerCase()
                ? 1 * orderSign
                : 0
            );
          case 'Release Date':
            return games.sort(
              (a: VideoGamesInterface, b: VideoGamesInterface) =>
                orderSign * (a.first_release_date - b.first_release_date)
            );
          default:
            return games;
        }
      })
    );
  }

  private getGames(): void {
    this.games$ = this.videoGamesService.getAllVideoGames();
  }

  private filterGames(filters: VideoGamesFilterInterface): void {
    this.filteredGames$ = this.games$.pipe(
      map((games: VideoGamesInterface[]) => {
        return games.filter((game) => {
          let nameFilter =
            !filters.gameName ||
            game.name.toLowerCase().includes(filters.gameName.toLowerCase());
          let ratingFilter =
            !filters.gameRating || game.rating > filters.gameRating;

          return nameFilter && ratingFilter;
        });
      })
    );
  }
}
