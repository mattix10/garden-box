import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MeasurementsService } from 'src/app/core/services/measurements.service';

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

  constructor(private measurementsService: MeasurementsService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // this.tableData = this.tableData;
  }

}
