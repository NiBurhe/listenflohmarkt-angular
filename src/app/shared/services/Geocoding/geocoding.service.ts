import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Geocoordinate } from './geocoding.models';
import { PreferenceService } from '../Preferences/preferences.service';

@Injectable()
export class GeocodingService {

  private readonly geocodingUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient, private preferenceService: PreferenceService) { }

  geocodeAddress(address: string): Observable<Geocoordinate> {
    if(!this.preferenceService.getPreference("osm")){
      throw new Error("You need to accept OSM")
    }
    return this.http.get<any[]>(this.geocodingUrl, {
      params: {
        q: address,
        format: 'json'
      }
    }).pipe(map((response) => {
      if (response && response[0]) {
        return {
          lat: +response[0].lat,
          long: +response[0].lon
        };
      } else {
        throw new Error('No result found');
      }
    }));
  }

  geocodeCity(postalCode: string, city: string): Observable<Geocoordinate> {
    if(!this.preferenceService.getPreference("osm")){
      throw new Error("You need to accept OSM")
    }
    return this.http.get<any[]>(this.geocodingUrl, {
      params: {
        city: city,
        postalcode: postalCode,
        format: 'json'
      }
    }).pipe(
      map((response) => {
        if (response && response[0]) {
          return {
            lat: +response[0].lat,
            long: +response[0].lon
          };
        } else {
          throw new Error('No result found');
        }
      })
    );
  }

  getCurrentPosition(): Observable<{lat: number, long: number}> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                long: lng,
              };
              observer.next(location);
              observer.complete();
            }
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

}
