import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { HomePage } from '../home/home';
import { GeocodingProvider } from '../../providers/geocoding/geocoding';
import { SoundsProvider } from '../../providers/sounds/sounds';


@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  lat: number;
  lng: number;
  language: any;
  formatted_address: any;
  address_components: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private translate: TranslateService,
    private _dateTime: DateTimeProvider,
    private _geoCoding: GeocodingProvider,
    private _sounds: SoundsProvider) {
    this.language = navParams.get('language');
  }

  ionViewDidLoad() {
    this.lat = -34.662305;
    this.lng = -58.36472349999997;
  }

  public changeLanguage(language) {
    this._sounds.reproducirSonido(this._sounds.get_soundClick());
    this.language = language;
    this._dateTime.initialized(language);
    this.translate.use(language);
  }

  public back() {
    this._sounds.reproducirSonido(this._sounds.get_soundClick());
    this.navCtrl.setRoot(HomePage, { 'language': this.language });
    console.log(this.language);
  }

  selectLanguage(selection: string) {
    switch (selection) {
      case "es": this.changeLanguage(selection);
        break;

      case "en": this.changeLanguage(selection);
        break;

      case "de": this.changeLanguage(selection);
        break;

      case "ru": this.changeLanguage(selection);
        break;

      case "fr": this.changeLanguage(selection);
        break;

      case "pt": this.changeLanguage(selection);
        break;
    }
  }

  // MAP USER ACTION
  selectLocation(event) {
    //this.showSpinner = true;
    this._geoCoding.obtenerDireccionDetalle(event.coords.lat, event.coords.lng)
      .then((data: any) => {
        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
        if (data != "undefined") {
          this.formatted_address = data.direccion;
          this.address_components = data.detalle;
          console.log("Dirección: " + this.formatted_address);
          console.log("Detalle: " + JSON.stringify(this.address_components));
          this.define_countryCode();
        }
        //this.showSpinner = false;
      })
      .catch((error) => {
        console.log("ERROR: al convertir coordenadas -> dirección: " + error);
      })
  }

  //DEFINE COUNTRY CODE
  define_countryCode() {
    for (let component of this.address_components) {
      if (component.short_name !== null) {
        console.log("DETALLE: " + component.short_name);
        if (component.short_name.length == 2) {
          this.define_languageByCountryCode(component.short_name);
        }
      }
    }
  }

  //DEFINE LANGUAGE BY COUNTRY CODE
  define_languageByCountryCode(code: string) {
    switch (code) {
      //ES - Español
      case 'AR':
      case 'UY':
      case 'CL':
      case 'PY':
      case 'BO':
      case 'PE':
      case 'EC':
      case 'CO':
      case 'VE':
      case 'PA':
      case 'CR':
      case 'NI':
      case 'SV':
      case 'HN':
      case 'GT':
      case 'DO':
      case 'PR':
      case 'MX':
      case 'ES':
      case 'GQ':
        this.selectLanguage('es'); break;
      //EN - English
      case 'GY':
      case 'US':
      case 'BZ':
      case 'VI':
      case 'JM':
      case 'US':
      case 'IE':
      case 'GB':
      case 'PG':
      case 'AU':
      case 'NZ':
      case 'SD':
      case 'SL':
      case 'LR':
      case 'GH':
      case 'NG':
      case 'SS':
      case 'KE':
      case 'UG':
      case 'ZM':
      case 'MW':
      case 'ZW':
      case 'BW':
      case 'NA':
      case 'ZA':
      case 'LS':
      case 'SZ':
        this.selectLanguage('en'); break;
      //DE - Deutsch
      case 'DE':
      case 'CH':
      case 'AT':
        this.selectLanguage('de'); break;
      //RU - Pусский
      case 'BY':
      case 'UA':
      case 'MD':
      case 'RU':
      case 'KZ':
      case 'UZ':
      case 'KG':
      case 'TJ':
        this.selectLanguage('ru'); break;
      //FR - Français
      case 'GF':
      case 'HT':
      case 'CA':
      case 'FR':
      case 'BE':
      case 'DZ':
      case 'TN':
      case 'ML':
      case 'NE':
      case 'TD':
      case 'SN':
      case 'GN':
      case 'CI':
      case 'TG':
      case 'BF':
      case 'NE':
      case 'CM':
      case 'CF':
      case 'DJ':
      case 'CD':
      case 'GA':
      case 'MG':
        this.selectLanguage('fr'); break;
      //PT - Portugues
      case 'BR':
      case 'PT':
      case 'GW':
      case 'CG':
      case 'AO':
      case 'MZ':
        this.selectLanguage('pt'); break;
      default:
        this.selectLanguage('es'); break;
    }
  }
}
