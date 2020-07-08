import { Component, OnInit } from '@angular/core';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { LoginHandlerService } from '../../@core/request/login/login-handler.service';
import { LoginRequestModel } from '../../@models/login/login';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;

  _userDetails: LoginRequestModel = new LoginRequestModel();
  constructor(private _request: LoginHandlerService) {}

  ngOnInit(): void {
    console.log(this._userDetails);
  }

  submitLogin(): void {
    console.log(this._userDetails);

    this._request.loginUser(this._userDetails).subscribe(
      (res) => {
        console.log(res.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
