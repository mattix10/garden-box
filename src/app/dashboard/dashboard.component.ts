import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemsService } from '../core/services/menu-items.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Breakpoints } from '../core/enums/Breakpoints';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  menuItems: any[] = [];
  parameters: any;
  isTabletResolution: boolean = false;

  constructor(public router: Router, private menuItemsService: MenuItemsService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getResolution();
    this.menuItems = this.menuItemsService.getMenuItems();
    this.getParameters();
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
    const parameters = this.menuItems.filter(item => item.category === 'parameters');
    console.log(parameters)
    this.parameters = parameters;
    // return parameters;
  }

}
