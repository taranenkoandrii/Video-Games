import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoGamesInterface } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoGamesService {
  constructor(private httpClient: HttpClient) {}

  getAllVideoGames(): Observable<VideoGamesInterface[]> {
    return this.httpClient.get<VideoGamesInterface[]>(
      'https://public.connectnow.org.uk/applicant-test/'
    );
  }
}
