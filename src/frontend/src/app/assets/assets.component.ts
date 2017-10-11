import { Component, OnInit } from '@angular/core';
import { AssetsService, AlertService } from '../services/index';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  public limit: Number = 20;
  public offset: Number = 0;
  assets = [];
  assetsReadingsData = [];
  asssetCodeField = null;
  constructor(private assetService: AssetsService, private alertService: AlertService) { }

  ngOnInit() {
    this.asssetCodeField = <HTMLSelectElement>document.getElementById('code');
    this.getAsset();
  }

  public setLimit(limit: Number) {
    this.limit = limit;
    console.log('Limit: ', limit);
    this.getAssetReading(this.asssetCodeField.value);
  }

  public setOffset(offset: Number) {
    this.offset = offset;
    console.log('offset:', offset);
    if (this.limit != null) {
      this.getAssetReading(this.asssetCodeField.value);
    }
  }

  public getAsset(): void {
    this.assets = [];
    this.assetService.getAsset().
      subscribe(
      data => {
        if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.assets = data;
        console.log('This is the asset data ',  this.assets);
      },
      error => { console.log('error', error); });
  }

  public getAssetReading(asset_code): void {
    console.log('Limit: ', this.limit);
    console.log('offset: ', this.offset);
    console.log('This is the asset code ',  asset_code);
    this.assetsReadingsData = [];
    if (asset_code.toLowerCase() === 'select') {
      return;
    }
    this.assetService.getAssetReadings(encodeURIComponent(asset_code), this.limit, this.offset).
      subscribe(
      data => {
        if (data.error) {
          console.log('error in response', data.error);
          this.alertService.error(data.error.message);
          return;
        }
        this.assetsReadingsData = [{
          asset_code: asset_code,
          data: data
        }];
        console.log('This is the asset reading data ',  this.assetsReadingsData);
      },
      error => { console.log('error', error); });
  }
}
