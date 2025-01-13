import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {EMPTY, Observable} from "rxjs";
import {INITIAL_PAGE, TOTAL_PAGES, UserService} from "../services/user.service";
import {UserListData} from "../types/user-list-data.type";

@Injectable({providedIn: 'root'})
export class UserListResolver implements Resolve<UserListData> {
  constructor(private userService: UserService, private router: Router) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserListData> {
    const page = Number(route.paramMap.get('page'));

    if (!page || page < 1 || page > TOTAL_PAGES) {
      const correctedPage = page < 1 || isNaN(page) ? INITIAL_PAGE : TOTAL_PAGES;
      this.router.navigate(['/users', correctedPage], {replaceUrl: true});
      return EMPTY;
    }

    return this.userService.getUsers(page);
  }
}
