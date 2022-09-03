import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { VideoGamesComponent } from './pages/video-games/video-games.component';

const routes: Routes = [
  { path: '', redirectTo: '/video-games', pathMatch: 'full' },
  { path: 'video-games', component: VideoGamesComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
