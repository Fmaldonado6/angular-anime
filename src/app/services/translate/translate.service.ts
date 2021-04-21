import { AppStrings, Languages } from './../../models/models';
import { Injectable } from '@angular/core';
import { es } from 'src/assets/languages/es.json'
import { en } from 'src/assets/languages/en.json'
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private selectedLanguage: BehaviorSubject<string> = new BehaviorSubject<string>(Languages.ES)

  get language() {
    return this.selectedLanguage.asObservable()
  }

  constructor() { }

  changeLanguage(language: string): AppStrings {

    localStorage.setItem("language", language)

    this.selectedLanguage.next(language)

    switch (language) {
      case Languages.ES:
        return es
      case Languages.EN:
        return en
      default:
        return es
    }

  }

  getCurrentLanguage(): AppStrings {
    const language = localStorage.getItem("language")
    if (language)
      return this.changeLanguage(language)

    return this.changeLanguage(Languages.ES)

  }

}
