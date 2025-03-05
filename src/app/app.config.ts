import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { storeProviders } from '@store/root-state';

import { routes } from './app.routes';
import { API_URL_TOKEN } from './config/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    ...storeProviders,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: API_URL_TOKEN,
      useValue: 'http://localhost:5001'
    }
  ]
};
