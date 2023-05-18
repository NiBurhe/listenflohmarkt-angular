import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, BASE_PATH} from 'build/openapi';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ApiModule
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.baseUrl },]
})
export class SharedModule { }
