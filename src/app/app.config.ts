import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {USER_API} from "./tokens/user-api.token";
import {provideHttpClient} from "@angular/common/http";
import {IMAGE_CONFIG} from "@angular/common";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: USER_API,
      useValue: 'https://randomuser.me/api/',
    },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40
      }
    },
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes)
  ]
};
