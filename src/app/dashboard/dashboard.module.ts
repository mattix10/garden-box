import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UpperFirstLetterPipe } from '../pipes/upper-first-letter.pipe';
import { BottomBarComponent } from '../shared/bottom-bar/bottom-bar.component';
import { PanelMenuItemComponent } from '../shared/panel-menu-item/panel-menu-item.component';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { HumidityComponent } from './humidity/humidity.component';
import { StatsComponent } from './stats/stats.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LightComponent } from './light/light.component';
import { FormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { SettingsComponent } from './settings/settings.component';
import { AirComponent } from './air/air.component';
import { MeasurementsService } from '../core/services/measurements.service';




@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    TemperatureComponent,
    UpperFirstLetterPipe,
    BottomBarComponent,
    PanelMenuItemComponent,
    HumidityComponent,
    StatsComponent,
    LightComponent,
    MyAccountComponent,
    SettingsComponent,
    AirComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule

  ],
  exports: [
    LightComponent,
    SharedModule
  ],
  providers: [
    MeasurementsService
  ]
})
export class DashboardModule { }
