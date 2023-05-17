import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrackingInterceptor } from './shared/interceptor/tracking.interceptor';
import { GoogleAnalyticsService } from './shared/services/Google-Analytics/google-analytics.service';
import { PreferenceService } from './shared/services/Preferences/preferences.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TrackingInterceptor, multi: true }, GoogleAnalyticsService, PreferenceService, {
    provide: APP_INITIALIZER,
    useFactory: (service: GoogleAnalyticsService) => () => {},
    deps: [GoogleAnalyticsService],
    multi: true
  }, {
    provide: APP_INITIALIZER,
    useFactory: (service: PreferenceService) => () => {},
    deps: [PreferenceService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
