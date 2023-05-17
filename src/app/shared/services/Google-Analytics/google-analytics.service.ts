import { Injectable } from '@angular/core';
import { PreferenceService } from '../Preferences/preferences.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CustomWindow extends Window {
  dataLayer: any[];
}

declare var window: CustomWindow;

window.dataLayer = window.dataLayer || [];

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private readonly googleAnalyticsScriptId = 'google-analytics-script';

  private readonly GA_MEASUREMENT_ID = "";

  constructor(private preferenceService: PreferenceService) {
    console.log("GA created")
    this.preferenceService.preference$.pipe(takeUntilDestroyed()).subscribe(preferences => this.loadGoogleAnalytics())
  }

  loadGoogleAnalytics() {
    console.log("check analytics")
    if (this.preferenceService.getPreference('analytics')) {
      if (!document.getElementById(this.googleAnalyticsScriptId)) {
        const script = document.createElement('script');
        script.id = this.googleAnalyticsScriptId;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.GA_MEASUREMENT_ID;
        script.async = true;

        document.head.appendChild(script);

        window['dataLayer'] = window['dataLayer'] || [];
        function gtag(...args: any[]){window['dataLayer'].push(arguments);}
        gtag('js', new Date());
        gtag('config', this.GA_MEASUREMENT_ID);
      }
    } else {
      const script = document.getElementById(this.googleAnalyticsScriptId);
      if (script) {
        script.remove();
      }
    }
  }
}
