import { Component } from '@angular/core';
import {  Configuration, UserService } from 'build/openapi';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'listenflohmarkt-angular';
  constructor(private http: HttpClient){
    const configuration = new Configuration({ credentials: {"bearerAuth": this.getToken()}})
    const userService: UserService = new UserService(this.http, [], configuration);
    userService.getUser().pipe(takeUntilDestroyed()).subscribe(result => {console.log(result)})
  }
  getToken(): string  {
    return ""
  }
}
