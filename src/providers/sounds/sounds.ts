import { Injectable } from '@angular/core';

@Injectable()
export class SoundsProvider {

  //AUDIO
  audio = new Audio();
  click_sound: string = "assets/sounds/click_sound.mp3";
  error_sound: string = "assets/sounds/error_sound.mp3";
  warning_sound: string = "assets/sounds/warning_sound.mp3";
  success_sound: string = "assets/sounds/success_sound.mp3";
  opening_sound: string = "assets/sounds/opening_sound.mp3";

  constructor() {
    console.log('Hello SoundsProvider Provider');
  }

  get_soundClick() {
    return this.click_sound;
  }

  get_soundError() {
    return this.error_sound;
  }

  get_soundWarning() {
    return this.warning_sound;
  }

  get_soundSuccess() {
    return this.success_sound;
  }

  get_soundOpening() {
    return this.opening_sound;
  }

  reproducirSonido(sound: string) {
    this.audio.src = sound;
    this.audio.load();
    this.audio.play();
  }
}
