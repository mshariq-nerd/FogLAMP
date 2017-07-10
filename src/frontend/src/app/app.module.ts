import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from "./store/user-reducer"

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './guards/index';
import { AlertComponent } from './directives/index';
import { AlertService, AuthService } from './services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { FooterComponent } from './footer/index';

import { DummyComponent } from './dummy/index';

import { KeysPipe } from './pipes/keys';
import { NgzioGaugeComponentModule } from './ngzio-gauge/ngzio-gauge.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgzioGaugeComponentModule,
    StoreModule.provideStore({userReducer}),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    FooterComponent,
    DummyComponent,
    KeysPipe
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
