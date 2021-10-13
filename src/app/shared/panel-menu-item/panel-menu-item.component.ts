import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-menu-item',
  templateUrl: './panel-menu-item.component.html',
  styleUrls: ['./panel-menu-item.component.scss']
})

export class PanelMenuItemComponent implements OnInit {


  @Input() 
  title: any = '';

  @Input()
  iconUrl: string ='';

  @Input()
  link: string = '';

  @Input()
  iconName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
