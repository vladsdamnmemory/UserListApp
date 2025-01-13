import {Routes} from '@angular/router';
import {UserListResolver} from "./resolvers/user-list.resolver";
import {UserListComponent} from "./components/user-list/user-list.component";
import {INITIAL_PAGE} from "./services/user.service";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `users/${INITIAL_PAGE}`
  },
  {
    path: 'users/:page',
    component: UserListComponent,
    resolve: {users: UserListResolver}
  }
];
