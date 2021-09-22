import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private menuItemsService: MenuItemsService) { }

  menuItems: any[] = [];
  selectedItem: any = '';

  get parameters() {
    const parameters = this.menuItems.filter(item => item.category == 'parameters');
    return parameters;
  }

  get devices() {
    const devices = this.menuItems.filter(item => item.category == 'devices');
    return devices;
  }

  get others() {
    const others = this.menuItems.filter(item => item.category === 'others');
    return others;
  }

  ngOnInit(): void {
    this.menuItems = this.menuItemsService.getMenuItems();
    console.log(this.menuItems);
  }

  selectItem(itemName: string) {

    this.selectedItem = itemName;
  }

}
