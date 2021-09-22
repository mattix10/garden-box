import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'zaloguj', component: HomeComponent,
  },  
  {
    path: 'rejestracja', component: HomeComponent,
  }, 
  {
    path: '',
    redirectTo: '/zaloguj',
    pathMatch: 'full' 
  },
  {
    path: '', component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }