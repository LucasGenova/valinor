import { Routes } from '@angular/router';
import { BoardsList } from './features/boards/components/boards-list/boards-list';
import { BoardDetail } from './features/boards/components/board-detail/board-detail';

export const routes: Routes = [
  { path: '', redirectTo: '/boards', pathMatch: 'full' },
  { path: 'boards', component: BoardsList },
  { path: 'boards/:id', component: BoardDetail },
];