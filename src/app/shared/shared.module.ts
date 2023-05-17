import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'build/openapi';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ApiModule
  ]
})
export class SharedModule { }
