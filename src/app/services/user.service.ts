import {inject, Injectable} from '@angular/core';
import {USER_API} from "../tokens/user-api.token";
import {catchError, Observable, retry} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserListData} from "../types/user-list-data.type";

export const INITIAL_PAGE = 1;
export const MAX_PER_PAGE = 9;
export const TOTAL_USER_AMOUNT = 81;
export const TOTAL_PAGES = Math.ceil(TOTAL_USER_AMOUNT / MAX_PER_PAGE);

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = inject(USER_API);
  private http = inject(HttpClient);

  getUsers(page: number): Observable<UserListData> {
    return this.http.get<UserListData>(`${this.api}`, {
      params: {
        results: MAX_PER_PAGE,
        seed: 'xxx',
        inc: 'name,location,picture,id,gender,email',
        page
      }
    })
      .pipe(
        retry(3),
        catchError(err => {
          throw 'Error in source. Details: ' + JSON.stringify(err);
        })
      );
  }
}
