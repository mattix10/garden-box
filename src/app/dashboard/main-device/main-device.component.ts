import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType } from 'src/app/core/enums/chartType';
import { SocketService } from 'src/app/core/services/socket.service';
@Component({
  selector: 'app-main-device',
  templateUrl: './main-device.component.html',
  styleUrls: ['./main-device.component.scss']
})
export class MainDeviceComponent implements OnInit, OnChanges {

  @Input() currentValue: number | null = null;

  chartType: ChartType = ChartType.Bar;
  myOptions = {
    colors: ['#0D77B4', ],
    legend: { position: 'none' },
    hAxis: {
      title: 'Godzina',
      titleTextStyle: {
        italic: false,
      }
    },
    vAxis: {
      title: '',
      titleTextStyle: {
        italic: false,
      }
    }
  };
  myData = [
    ['Wypełnienie zbiornika', 71],
  ];
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    // this.socketService.listen()
    console.log(this.currentValue)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
