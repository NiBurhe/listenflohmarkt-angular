import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient,) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/v2/translations/${lang}`);
  }
}