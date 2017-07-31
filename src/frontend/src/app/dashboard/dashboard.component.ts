import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigurationService, StatisticsService } from '../services/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  congfigurationData = [];
  categoryData = [];
  statisticsData = [];
  statHistoryData = [];
  
  type: string;
  data: any;
  options: any;

  readingChart: string;
  readingValues: any;

  purgeChart: string;
  purgedValues: any;

  sentChart: string;
  sentValues: any;

  constructor(private configService: ConfigurationService,
    private statisticsService: StatisticsService,
    private router: Router) {
    this.type = "line"
    this.data = [];

    this.readingChart = "line";
    this.readingValues = [];

    this.purgeChart = "line";
    this.purgedValues = [];

    this.sentChart = "line";
    this.sentValues = [];
  }

  ngOnInit() {
    this.getCategories();
    this.getStatistics();
    this.getStatisticsHistory();
  }

  public getCategories(): void {
    this.configService.getCategories().
      subscribe(
      data => {
        this.congfigurationData = data.categories;
        console.log("This is the congfigurationData ", this.congfigurationData);
        this.getCategory();
      },
      error => { console.log("error", error) });
  }

  public getCategory(): void {
    this.congfigurationData.forEach(element => {
      this.configService.getCategory(element.key).
        subscribe(
        data => {
          this.categoryData.push(data);
          console.log("This is the categoryData ", this.categoryData);
        },
        error => { console.log("error", error) });
    });
  }

  public getStatistics(): void {
    var labels = [];
    var values = [];
    this.statisticsService.getStatistics().
      subscribe(data => {
        this.statisticsData = data;
        console.log("This is the statisticsData ", data);
        for (var key in data) {
          values.push(data[key]);
          labels.push(key);
        }
        this.statisticsGraph(labels, values);
      },
      error => { console.log("error", error) });
  }

  statisticsGraph(labels, data): void {
    console.log("Labels", labels, " data", data);
    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Latest',
          data: data,
          backgroundColor: "rgb(176,196,222)"
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  }

  public getStatisticsHistory(): void {
    var labels = [];
    var values = [];
    var readingsValues = []
    var purgedValues = []
    var sentValues = []
    this.statisticsService.getStatisticsHistory().
      subscribe(data => {
        this.statHistoryData = data.statistics;
        this.statHistoryData.forEach(element => {
          Object.keys(element).forEach(aKey => {
            if (aKey.indexOf("READINGS") !== -1) {
              readingsValues.push(element[aKey])
            }
            if (aKey.indexOf("PURGED") !== -1 && aKey.indexOf("UNSNPURGED") == -1) {
              purgedValues.push(element[aKey])
            }
            if (aKey.indexOf("SENT") !== -1 && aKey.indexOf("UNSENT") == -1) {
              sentValues.push(element[aKey])
            }
          });

        });
        console.log("This is the history readings ", readingsValues);
        console.log("This is the stats history for purge: ", purgedValues);
        console.log("This is the history sent ", sentValues);
        this.statsHistoryReadingsGraph(readingsValues);
        this.statsHistoryPurgedGraph(purgedValues);
        this.statsHistorySentGraph(sentValues);
      },
      error => { console.log("error", error) });
  }

  statsHistoryReadingsGraph(data): void {
    var i = 0;
    var labels =[];
    data.forEach(element => {
      i++;
      labels.push(i)
    });
    this.readingChart = "line"
    this.readingValues = {
      labels: labels,
      datasets: [
        {
          label: 'delta',
          data: data,
          backgroundColor: "rgb(100,149,237)"
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  }

  statsHistoryPurgedGraph(data): void {
    var i = 0;
    var labels =[];
    data.forEach(element => {
      i++;
      labels.push(i)
    });
    this.purgeChart = "line"
    this.purgedValues = {
      labels: labels,
      datasets: [
        {
          label: 'delta',
          data: data,
          backgroundColor: "rgb(255,165,0)"
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  }

  statsHistorySentGraph(data): void {
    var i = 0;
    var labels =[];
    data.forEach(element => {
      i++;
      labels.push(i)
    });
    this.sentChart = "line"
    this.sentValues = {
      labels: labels,
      datasets: [
        {
          label: 'delta',
          data: data,
          backgroundColor: "rgb(144,238,144)"
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  }


  public showModal(event) {
    var el = document.getElementById('cat-details');
    el.classList.add('is-active');
  }

  public closeModal(event) {
    var el = document.getElementById('cat-details');
    el.classList.remove('is-active');
  }

}