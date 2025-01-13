import {InjectionToken} from '@angular/core';

export const USER_API = new InjectionToken<string>('USER_API', {
  providedIn: 'root',
  factory: () => 'https://randomuser.me/api/',
});
