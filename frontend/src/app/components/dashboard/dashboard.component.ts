import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { GlobalTranslationService } from '../../shared/global-translation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedLang;

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: GlobalTranslationService
  ) {
    const localStorageLang = localStorage.getItem('userLang');
    this.selectedLang = localStorageLang ? localStorageLang : 'en';
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }

  doLangSwitch() {
    localStorage.setItem('userLang', this.selectedLang);
    this.translate.switchLanguage(this.selectedLang);
  }
}
