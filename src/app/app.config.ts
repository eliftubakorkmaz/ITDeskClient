import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),
    provideRouter(routes), 
    importProvidersFrom
    ([BrowserAnimationsModule,SocialLoginModule]),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '691254804568-mqp1r3csjvt1fisblfi88nqo0t354a4a.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err:HttpErrorResponse) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
};
