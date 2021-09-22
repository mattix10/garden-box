import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
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
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { MainParameterComponent } from './main-parameter/main-parameter.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { MainChartComponent } from './main-chart/main-chart.component';
import { MainDeviceComponent } from './main-device/main-device.component';
import { MainInfoComponent } from './main-info/main-info.component';
import { MainTableComponent } from './main-table/main-table.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ParameterTitleComponent } from './parameter-title/parameter-title.component';
import { ParameterComponent } from './parameter/parameter.component';
import { GaugeModule } from 'angular-gauge';


@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    TemperatureComponent,
    BottomBarComponent,
    PanelMenuItemComponent,
    HumidityComponent,
    StatsComponent,
    LightComponent,
    MyAccountComponent,
    SettingsComponent,
    AirComponent,
    SidenavComponent,
    SidenavItemComponent,
    MainParameterComponent,
    GeneralInfoComponent,
    MainChartComponent,
    MainDeviceComponent,
    MainInfoComponent,
    MainTableComponent,
    ParameterTitleComponent,
    ParameterComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    GoogleChartsModule,
    GaugeModule.forRoot()

  ],
  exports: [
    LightComponent,
    SharedModule,
    GoogleChartsModule,
    GaugeModule
  ],
  providers: [
    MeasurementsService
  ]
})
export class DashboardModule { }
