import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthenticationService } from './services/authentication.service';

export class authenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
