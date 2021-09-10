import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableHeaderOne: string = '';
  @Input() tableHeaderTwo: string = '';
  @Input() tableData: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
