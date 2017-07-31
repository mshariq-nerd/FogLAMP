import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './guards/index';
import { AlertComponent } from './directives/index';
import { AlertService, AuthService, ConfigurationService, StatisticsService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { FooterComponent } from './footer/index';

import { KeysPipe } from './pipes/keys';
import { NgzioGaugeComponentModule } from './ngzio-gauge/ngzio-gauge.module';
import { DashboardComponent } from './dashboard/index';
import { ConfigurationManagerComponent } from '../app/configuration-manager/configuration-manager.component';

import { ChartModule } from './chart/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgzioGaugeComponentModule,
    ChartModule,
    
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    FooterComponent,
    KeysPipe,
    DashboardComponent,
    ConfigurationManagerComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    ConfigurationService,
    StatisticsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }