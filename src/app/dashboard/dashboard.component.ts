import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItemsService } from '../core/services/menu-items.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoints } from '../core/enums/Breakpoints';
import { SocketService } from '../core/services/socket.service';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Measurement } from '../core/interfaces/Measurement';
import { MenuItem } from '../core/interfaces/MenuItem';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  parameters: MenuItem[] = [];
  isTabletResolution: boolean = false;
  paramaterMeasurements: Measurement[] = [];
  mainDeviceMeasurementIndex: number = -1;
  mainDeviceMeasurement: Measurement;
  params: string[] = [];

  constructor(private socketService: SocketService, public router: Router, private menuItemsService: MenuItemsService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getResolution();
    this.menuItems = this.menuItemsService.getMenuItems();
    this.getParameters();
    this.params = this.parameters.map((param: MenuItem): string => param.name);
    this.params.push('container');
    let measurements: Measurement[] = [];

    if (this.router.url === '/panel') {
      this.socketService.emitAllValues(this.params);
      this.listen(measurements);
    }

    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd))
      .subscribe(data => {

      if (data.url === '/panel') {
        this.socketService.emitAllValues(this.params);
        this.listen(measurements);
      } else {
        this.socketService.removeListeners();
      }
    })
  }

  listen(measurements: Measurement[]) {
    this.socketService.listenAllParameters(this.params)
      .pipe(distinctUntilChanged())
      .subscribe((data: Measurement) => {
        let measurementIndex = measurements?.findIndex((m: Measurement) => m?.name == data?.name);
        if (measurementIndex != -1) {
          measurements[measurementIndex] = data;
        } else measurements.push(data);
        this.paramaterMeasurements = measurements;
        if (this.mainDeviceMeasurementIndex == -1) this.mainDeviceMeasurementIndex = this.paramaterMeasurements.findIndex((m: Measurement) => m?.name == 'container');
        this.mainDeviceMeasurement = this.paramaterMeasurements[this.mainDeviceMeasurementIndex];
      });
  }

  ngOnDestroy() {
    this.socketService.removeListeners()
  }

  getResolution() {
    this.breakpointObserver.observe([
      Breakpoints.Tablet
        ]).subscribe(result => {
          if (result.matches) {
            this.isTabletResolution = true
          } else {
            this.isTabletResolution = false
          }
        });
  }

  getParameters() {
    this.parameters = this.menuItems.filter((item: MenuItem) => item.category === 'parameters');
  }

}
