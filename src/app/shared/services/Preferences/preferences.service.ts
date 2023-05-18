import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserCookiePreferences } from "./preferences.model";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  private preferences: UserCookiePreferences = {
    osm: false,
    analytics: false,
    tracking: false
  };

  private readonly localStorageKey = "preferences"

  private preferenceSubject = new BehaviorSubject<UserCookiePreferences>(this.loadPreferences());
  preference$ = this.preferenceSubject.asObservable();

  constructor(){
  }

  setPreference(key: keyof UserCookiePreferences, value: boolean) : void {
    this.preferences[key] = value;
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.preferences));
    this.preferenceSubject.next(this.preferences)
  }

  getPreference(key: keyof UserCookiePreferences): boolean {
    return this.preferences[key];
  }

  loadPreferences() : UserCookiePreferences{
    const storedPreferences = localStorage.getItem(this.localStorageKey);
    if (storedPreferences) {
      this.preferences = JSON.parse(storedPreferences);
    }
    return this.preferences;
  }

  isSet() : boolean{
    return localStorage.getItem(this.localStorageKey) !== null;
  }
}
