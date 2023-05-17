import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PreferenceService } from "../services/Preferences/preferences.service";

@Injectable()
export class TrackingInterceptor implements HttpInterceptor {
  constructor(private preferenceService: PreferenceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('https://www.listenflohmarkt-api.org') && this.preferenceService.getPreference('tracking')) {
      const cloned = req.clone({
        setHeaders: { tracking: 'true' }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
