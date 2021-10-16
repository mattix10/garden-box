import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren:  () => import('./account/account.module').then(mod => mod.HomeModule)
  },
  {
    path: 'panel', loadChildren:  () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule), canActivate: [AuthGuard]
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
