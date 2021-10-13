import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() tableHeaderOne: string = '';
  @Input() tableHeaderTwo: string = '';
  @Input() tableData: any[] = [];
  @Input() unit: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log('elo')
    this.tableData = this.tableData;
  }

}
