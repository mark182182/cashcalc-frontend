import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import CONSTANTS from '../../constants/constants';
import { Observable } from 'rxjs';
import {
  LoginRequestModel,
  LoginResponseModel,
} from 'src/app/@models/login/login';

@Injectable({
  providedIn: 'root',
})
export class LoginHandlerService {
  constructor(private http: HttpClient) {}

  loginUser(user: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      CONSTANTS.BASE_URL + CONSTANTS.API_ROUTES.LOGIN,
      user
    );
  }

  isLoggedIn(): boolean {
    return true;
  }
}
