import { Component } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  faWeightHanging,
  faDollarSign,
  faShieldAlt,
  faShippingFast,
  faUser,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isActive: boolean = false;
  menuStatus: boolean = false;
  loginMenu: boolean = false;

  title: String = 'CashCalc';
  faGlobe = faGlobe;
  faWeightHanging = faWeightHanging;
  faDollarSign = faDollarSign;
  faShieldAlt = faShieldAlt;
  faShippingFast = faShippingFast;
  faUser = faUser;
  faKey = faKey;

  ngOnInit() {}

  toggleMenu = () => {
    this.menuStatus = !this.menuStatus;
  };

  openLogin = () => {
    this.loginMenu = true;
  };

  closeLogin = () => {
    this.loginMenu = false;
  };

  openCalculateWindow = () => {
    this.isActive = true;
  };

  closeCalculateWindow = () => {
    this.isActive = false;
  };
}
