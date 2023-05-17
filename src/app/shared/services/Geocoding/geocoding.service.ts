import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Geocoordinate } from './geocoding.models';

@Injectable()
export class GeocodingService {

  private readonly geocodingUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  geocodeAddress(address: string): Observable<Geocoordinate> {
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
}
