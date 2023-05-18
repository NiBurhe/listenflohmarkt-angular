import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { GeocodingService } from 'src/app/shared/services/Geocoding/geocoding.service';
import { PreferenceService } from 'src/app/shared/services/Preferences/preferences.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
  providers: [MapService, GeocodingService],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | undefined;
  private subscriptions: Subscription[] = [];
  isMapEnabled= false;
  constructor(
    private mapService: MapService,
    private preferenceService: PreferenceService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  private initMap(): void {
    this.mapService.loadMarker();
    this.map = L.map('map', {
      center: [48.1754, 11.2525],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
    this.subscriptions.push(
      this.mapService.marker$.subscribe((markers) => {
        markers.forEach((marker) => {
          if (this.map) {
            marker.addTo(this.map);
          }
        });
      })
    );

    this.subscriptions.push(
      this.mapService.event$.subscribe((event) => {
        console.log('selected Event:' + event.name);
      })
    );

    this.subscriptions.push(
      this.mapService.viewConfig$.subscribe((config) => {
        if (this.map) {
          this.map.setView(config.center, config.zoom);
        }
      })
    );
  }

  acceptOSM(){
    this.preferenceService.setPreference("osm", true);
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.preferenceService.preference$.subscribe((preferences) => {
        this.isMapEnabled = preferences.osm;
        this.cdr.detectChanges();
        if (preferences.osm) {
          this.initMap();
        }
      })
    );
  }
}
