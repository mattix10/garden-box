import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BottomBarComponent } from '../shared/bottom-bar/bottom-bar.component';
import { PanelMenuItemComponent } from '../shared/panel-menu-item/panel-menu-item.component';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { SettingsComponent } from './settings/settings.component';
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
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from '../core/services/socket.service';

const config: SocketIoConfig = { url: 'http://192.168.137.160:80', options: {transports: ['websocket'], upgrade: false} };

@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    BottomBarComponent,
    PanelMenuItemComponent,
    StatsComponent,
    MyAccountComponent,
    SettingsComponent,
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
    GaugeModule.forRoot(),
    SocketIoModule.forRoot(config)

  ],
  exports: [
    SharedModule,
    GoogleChartsModule,
    GaugeModule
  ],
  providers: [
    MeasurementsService,
    SocketService
  ]
})
export class DashboardModule { }
