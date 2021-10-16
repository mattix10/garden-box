import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  convertDate(createdAt: string): string {
    const date = createdAt.substring(11,16);
    return date;
  }

  createDataForChart(data: any) {
    let dataChart: any = [];
    data.forEach((data: any) => {
      const date = this.convertDate(data.createdAt);
      dataChart.push([date, +data.value]);
    });
    return dataChart;
  }

  getChartOptions() {
    const chartOptions = {
      colors: ['#38AA73', ],
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

    return chartOptions;
  }
}
