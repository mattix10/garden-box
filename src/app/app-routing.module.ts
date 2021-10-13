import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren:  () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'panel', loadChildren:  () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
  },
  {
    path: '',
    redirectTo: '/zaloguj',
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
