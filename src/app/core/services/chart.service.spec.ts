import { TestBed } from '@angular/core/testing';
import { Measurement } from '../interfaces/Measurement';
import { DataChart } from '../interfaces/DataChart';
import { ChartService } from './chart.service';

describe('ChartService', () => {
  let service: ChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create data for chart', () => {
    const measurements: Measurement[] = [
      {value: 24, createdAt: '2021-09-09 20:00:05'},
      {value: 44, createdAt: '2021-02-19 19:11:05'},
    ]

    const dataChart: DataChart= [
      ['20:00', 24],
      ['19:11', 44]
    ]
    expect(service.createDataForChart(measurements)).toEqual(dataChart)
  })

  it('should return chartOptions', () => {
    const chartOptions = {
      colors: ['#38AA73'],
      legend: {
        position: 'none' 
      },
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

    expect(service.getChartOptions()).toEqual(chartOptions);
  })
});
