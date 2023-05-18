import { Injectable, OnDestroy } from '@angular/core';
import { CommonService, Event } from 'build/openapi';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import * as L from 'leaflet';
import { ViewConfig } from './map.model';
import { GeocodingService } from 'src/app/shared/services/Geocoding/geocoding.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class MapService implements OnDestroy {
  private markerSubject = new BehaviorSubject<L.Marker[]>([]);
  marker$ = this.markerSubject.asObservable();
  private viewConfigSubject = new BehaviorSubject<ViewConfig>({
    center: new L.LatLng(48.1754, 11.2525),
    zoom: 13,
  });
  viewConfig$ = this.viewConfigSubject.asObservable();
  private EventSubject = new Subject<Event>();
  event$ = this.EventSubject.asObservable();

  private subscriptions: Subscription[] = [];

  private customIcon = L.icon({
    iconUrl: 'assets/icon.png',
    iconSize: [38, 38], // size of the icon, change this according to your icon image size
    iconAnchor: [22, 22], // point of the icon where it will correspond to marker's location
    popupAnchor: [0, -19], // point from which the popup should open relative to the iconAnchor
  });

  constructor(
    private commonService: CommonService,
    private geocodeService: GeocodingService
  ) {
    this.geocodeService
      .getCurrentPosition()
      .pipe(takeUntilDestroyed())
      .subscribe((coordinates) => { 
        this.viewConfigSubject.next({
          center: new L.LatLng(coordinates.lat, coordinates.long),
          zoom: 14,
        });
      });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  public loadMarker(): void {
    this.subscriptions.push(
      this.commonService.findEvent().subscribe((response) => {
        if (response.responseCode === 'FE000') {
          this.markerSubject.next(
            response.data.events.map((event) => this.mapEvent(event))
          );
        }
      })
    );
  }

  private mapEvent(event: Event): L.Marker {
    const marker = L.marker([Number(event.lat), Number(event._long)], {
      icon: this.customIcon,
    });

    marker.bindPopup(`<b>${event.name}</b><br><a id='event_details_${event.id}'>Click me</a>`);

    marker.on('popupopen', () => {
      document.getElementById(`event_details_${event.id}`)?.addEventListener('click', (e) => {
        e.preventDefault();
        this.EventSubject.next(event);
      });
    });

    return marker;
  }
}
