import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() selectedParam = new EventEmitter<any>();

  ngOnInit(): void {
    this.parameters = this.menuItemsService.getMenuItems().filter((item: any )=> item.category == 'parameters');
    this.menuItemsService.getMenuItems().forEach((item:any) => {
      if (item.category == 'parameters') {
        this.parametersTitle.push(item.title)
      }
    });
    this.selectedParameter = this.parameters[0];
    // this.selectedParam.emit(this.selectedParameter);
  }

  selectTitle(title: string) {
    this.selectedParameter= this.parameters.find((param:any) => param.title == title);
    this.selectedParam.emit(this.selectedParameter);
  }
}
