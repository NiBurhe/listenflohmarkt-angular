import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'user',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
},
{
  path: 'event',
  loadChildren: () => import('./event/event.module').then(m => m.EventModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
