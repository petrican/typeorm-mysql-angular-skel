import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class GlobalTranslationService {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'nl']);

    const userLang = localStorage.getItem('userLang');

    if (userLang) {
      translate.setDefaultLang(userLang);
    } else {
      translate.setDefaultLang('en');
    }
  }

  switchLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
  }
}
