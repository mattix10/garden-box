import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/guards/login.guard';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'zaloguj', component: AccountComponent,
  },  
  {
    path: 'rejestracja', component: AccountComponent,
  }, 
  {
    path: '',
    redirectTo: '/zaloguj',
    pathMatch: 'full' 
  },
  {
    path: '', component: AccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }