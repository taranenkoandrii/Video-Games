export interface VideoGamesInterface {
  id: number;
  first_release_date: number;
  name: string;
  rating: number;
  summary: string;
}

export interface VideoGamesFilterInterface {
  gameName: string;
  gameRating: number;
  orderName: string;
  order: string;
}

export enum CurrentPage {
  VIDEO_GAME = '/video-games',
  CONTACT = '/contacts',
}
