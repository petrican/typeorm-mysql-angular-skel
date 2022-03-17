import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { GlobalTranslationService } from './shared/global-translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: GlobalTranslationService,
    private authService: AuthService
  ) {}

  title = 'App';

  ngOnInit() {
    this.authService.autoLogin();
  }
}
