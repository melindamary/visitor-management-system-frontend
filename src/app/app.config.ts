import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true
    },
     provideRouter(routes),
     provideNativeDateAdapter(),
     provideClientHydration(), 
     provideAnimationsAsync(),
     MessageService,
     ConfirmationService,
     DatePipe]
};
