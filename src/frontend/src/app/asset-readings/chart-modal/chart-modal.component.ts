import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AssetsService } from '../../services/index';
import Utils from '../../utils';
import { ChartComponent } from '../../chart/chart.component';
import { AssetSummaryService } from './../asset-summary/asset-summary-service';
import ReadingsValidator from '../assets/readings-validator';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css']
})
export class ChartModalComponent implements OnInit {
  public assetChart: string;
  public assetReadingValues: any;
  public assetCode;
  public isValidData = false;
  public assetReadingSummary = [];

  @ViewChild(ChartComponent) private chartComp;

  constructor(private assetService: AssetsService, private assetSummaryService: AssetSummaryService) {
    this.assetChart = 'line';
    this.assetReadingValues = [];
  }

  ngOnInit() { }

  public toggleModal(shouldOpen: Boolean) {
    const chart_modal = <HTMLDivElement>document.getElementById('chart_modal');
    if (shouldOpen) {
      chart_modal.classList.add('is-active');
      return;
    }
    chart_modal.classList.remove('is-active');
    this.assetCode = '';
    if (this.isValidData) {
      this.chartComp.ngOnDestroy();
    }
  }

  public plotReadingsGraph(assetCode) {
    this.isValidData = true;
    this.assetCode = assetCode;
    this.assetService.getAssetReadings(encodeURIComponent(assetCode)).
      subscribe(
      data => {
        if (data.error) {
          this.isValidData = false;
          console.log('error in response', data.error);
          return;
        }
        const validRecord = ReadingsValidator.validate(data);
        if (validRecord) {
          this.getAssetTimeReading(data);
          this.assetSummaryService.getReadingSummary(assetCode, data[0]);
          this.assetSummaryService.assetReadingSummary.subscribe(
            value => {
              this.assetReadingSummary = value;
            });
        } else {
          this.isValidData = false;
          console.log('No valid data to show trends.');
        }
      },
      error => { console.log('error', error); });
  }

  getAssetTimeReading(assetChartRecord) {
    const assetTimeLabels = [];
    let assetReading = [];
    const first_dataset = [];
    const second_dataset = [];
    const third_dataset = [];
    let d1;
    let d2;
    let d3;
    assetChartRecord.forEach(data => {
      let count = 0;
      Object.keys(data.reading).forEach(key => {
        count++;
        switch (count) {
          case 1:
            first_dataset.push(data.reading[key]);
            d1 = {
              data: first_dataset,
              label: key
            };
            break;
          case 2:
            second_dataset.push(data.reading[key]);
            d2 = {
              data: second_dataset,
              label: key
            };
            break;
          case 3:
            third_dataset.push(data.reading[key]);
            d3 = {
              data: third_dataset,
              label: key
            };
            break;
          default:
            break;
        }
      });
      if (Utils.parseDate(data.timestamp)) {
        assetTimeLabels.push(Utils.formateDateWithMs(data.timestamp));
      }
    });
    assetReading.push(d1);
    assetReading.push(d2);
    assetReading.push(d3);
    // remove undefined dataset from the array
    assetReading = assetReading.filter(function (n) { return n !== undefined; });
    this.statsAssetReadingsGraph(assetTimeLabels, assetReading);
  }

  statsAssetReadingsGraph(labels, assetReading): void {
    let ds = [];
    if (assetReading.length === 3) {
      const d1 = assetReading[0].data;
      const d2 = assetReading[1].data;
      const d3 = assetReading[2].data;
      ds = [{
        label: assetReading[0].label,
        data: d1,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#3498DB',
        borderColor: '#85C1E9'
      },
      {
        label: assetReading[1].label,
        data: d2,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#239B56',
        borderColor: '#82E0AA',
      },
      {
        label: assetReading[2].label,
        data: d3,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#B03A2E',
        borderColor: '#F1948A',
      }];
    } else if (assetReading.length === 2) {
      const d1 = assetReading[0].data;
      const d2 = assetReading[1].data;
      ds = [{
        label: assetReading[0].label,
        data: d1,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#3498DB',
        borderColor: '#85C1E9'
      },
      {
        label: assetReading[1].label,
        data: d2,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#239B56',
        borderColor: '#82E0AA',
      }];
    } else {
      console.log('Data 1', assetReading[0].data);
      ds = [{
        label: assetReading[0].label,
        data: assetReading[0].data,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#239B56',
        borderColor: '#82E0AA',
      }];
    }
    this.assetChart = 'line';
    this.assetReadingValues = {
      labels: labels,
      datasets: ds
    };
  }
}