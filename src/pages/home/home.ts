import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { ConfigPage } from '../config/config';
import { SoundsProvider } from '../../providers/sounds/sounds';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  language: any;
  date: string;
  hour: string;
  monthNames: string[];
  monthShortNames: string[];
  daysNames: string[];
  daysShortNames: string[];

  constructor(private translate: TranslateService,
    public navCtrl: NavController,
    private _dateTime: DateTimeProvider,
    public navParams: NavParams,
    private _sounds: SoundsProvider) {
    this.language = navParams.get('language');
    if (this.language == null || this.language == undefined) {
      console.log(this.language);
      this.language = 'es';
      this._dateTime.initialized('es');
    }
    this.changeFormatDate();
  }

  public changeFormatDate() {
    this._dateTime.initialized(this.language);
    this.monthNames = this._dateTime.getMonthNames();
    this.daysNames = this._dateTime.getWeekDays();
    this.daysShortNames = this._dateTime.getWeekDaysShort();
    this.monthShortNames = this._dateTime.getMonthNamesShort();
    this.date = this._dateTime.getDate();
    console.log("DATE: " + this.date);
    this.hour = this._dateTime.getHour();
    console.log("HOUR: " + this.hour);
    console.log(this.monthNames);
    console.log(this.monthShortNames);
    //this.showSpinner = false;
  }

  public goToConfig() {
    this._sounds.reproducirSonido(this._sounds.get_soundClick());
    this.navCtrl.setRoot(ConfigPage, { 'language': this.language });
  }
}
