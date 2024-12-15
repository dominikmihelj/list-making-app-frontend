import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route points to HomeComponent
  { path: 'boards/:id', component: BoardComponent }, // Route to the board view
];
