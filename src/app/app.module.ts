import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { DateTimeProvider } from '../providers/date-time/date-time';
import { IonicStorageModule } from '@ionic/storage';
import { ConfigPage } from '../pages/config/config';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { GeocodingProvider } from '../providers/geocoding/geocoding';
import { SoundsProvider } from '../providers/sounds/sounds';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (HttpLoaderFactory),
              deps: [HttpClient]
          }
      }),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: environment.googleMaps.apiKey })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DateTimeProvider,
    GeocodingProvider,
    SoundsProvider
  ]
})
export class AppModule {}


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}