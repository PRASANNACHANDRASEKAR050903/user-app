import { Routes } from '@angular/router';
import { UserComponent } from './users/users';
import { UserListComponent } from './user-list/user-list';

export const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user-list', component: UserListComponent }
];