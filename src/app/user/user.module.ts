import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { BarcodeScannerService } from '../shared/services/Barcode-Scanner/barcode-scanner.service';
import { GeocodingService } from '../shared/services/Geocoding/geocoding.service';




@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [BarcodeScannerService, GeocodingService]
})
export class UserModule { }
