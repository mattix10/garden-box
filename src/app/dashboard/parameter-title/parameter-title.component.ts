import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/core/interfaces/MenuItem';
import { MenuItemsService } from 'src/app/core/services/menu-items.service';

@Component({
  selector: 'app-parameter-title',
  templateUrl: './parameter-title.component.html',
  styleUrls: ['./parameter-title.component.scss']
})
export class ParameterTitleComponent implements OnInit {

  parameters: any;
  parametersTitle: any = [];
  selectedParameter: any;

  constructor(private menuItemsService: MenuItemsService) { }
  @Output() selectedParam = new EventEmitter<MenuItem>();

  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: MenuItem )=> (item.category == 'parameters' || item.name == 'container') );
    this.menuItemsService.getMenuItems().forEach((item: MenuItem) => {
      if (item.category === 'parameters' || item.name === 'container') {
        this.parametersTitle.push(item.title)
      }
    });
    this.selectedParameter = this.parameters[0];
    // this.selectedParam.emit(this.selectedParameter);
  }

  selectTitle(title: string) {
    this.selectedParameter = this.parameters.find((param:MenuItem) => param.title === title);
    this.selectedParam.emit(this.selectedParameter);
  }
}
