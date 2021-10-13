import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ParameterComponent } from './parameter/parameter.component';
import { SettingsComponent } from './settings/settings.component';
import { StatsComponent } from './stats/stats.component';

const childRoutes: Routes = [
  {
    path: 'temperatura',
    component: ParameterComponent
  },
  {
    path: 'wilgotność',
    component: ParameterComponent
  },
  {
    path: 'oświetlenie',
    component: ParameterComponent
  },
  {
    path: 'statystyki',
    component: StatsComponent
  },
  {
    path: 'powietrze',
    component: ParameterComponent
  },
  {
    path: 'zbiornik',
    component: ParameterComponent
  },
  {
    path: 'ustawienia',
    component: SettingsComponent
  },
  {
    path: 'moje-konto',
    component: MyAccountComponent
  }
  // {
  //   path: '',
  //   redirectTo: 'panel',
  //   pathMatch: 'full' 
  // },
];
const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: childRoutes
  }]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
