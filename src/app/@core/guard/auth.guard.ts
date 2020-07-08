import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginHandlerService } from '../request/login/login-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _requestHandler: LoginHandlerService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    if (this._requestHandler.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
