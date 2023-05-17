import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BarcodeScannerService } from '../shared/services/Barcode-Scanner/barcode-scanner.service';
import { GeocodingService } from '../shared/services/Geocoding/geocoding.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  constructor(private barcodeScannerService: BarcodeScannerService, private geocodingService: GeocodingService){
    this.barcodeScannerService.barcode$.pipe(takeUntilDestroyed()).subscribe(code => {
      console.log(code)
    })
  }
  ngOnInit(): void {
    //this.geocodingService.geocodeCity('82256', 'Fürstenfeldbruck').subscribe(response => {
    //  console.log(response);
    //});
  }

}
