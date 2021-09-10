import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirComponent } from './air/air.component';
import { DashboardComponent } from './dashboard.component';
import { HumidityComponent } from './humidity/humidity.component';
import { LightComponent } from './light/light.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SettingsComponent } from './settings/settings.component';
import { StatsComponent } from './stats/stats.component';
import { TemperatureComponent } from './temperature/temperature.component';

const childRoutes: Routes = [
  {
    path: 'temperatura',
    component: TemperatureComponent
  },
  {
    path: 'wilgotność',
    component: HumidityComponent
  },
  {
    path: 'oświetlenie',
    component: LightComponent
  },
  {
    path: 'statystyki',
    component: StatsComponent
  },
  {
    path: 'powietrze',
    component: AirComponent
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
