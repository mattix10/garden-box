import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent implements OnInit {

  @Input() item: any;
  selectedItem: string = '';
  isActive: boolean = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.item)
  }

  selectItem(itemName: string) {
    console.log(itemName)
    if(this.selectedItem == itemName) this.isActive = true;
  }

}
