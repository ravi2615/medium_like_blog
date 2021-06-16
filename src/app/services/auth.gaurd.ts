import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this._authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
