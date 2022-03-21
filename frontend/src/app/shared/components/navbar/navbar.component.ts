import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getFullUserName } from 'src/app/components/app-login-wrapper/store/login.selectors';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private subUsername: Subscription | undefined;

  public user_full_name: string = '';
  public initialOfName: string = '?';

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subUsername = this.store
      .select(getFullUserName)
      .subscribe((fullUserName) => {
        this.user_full_name = fullUserName;
        this.initialOfName = fullUserName.length ? fullUserName.charAt(0) : '?';
      });
  }

  onLogout() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }
}
