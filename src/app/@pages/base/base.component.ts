import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'base-root',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  isActive = false;
  menuStatus = false;
  loginMenu = false;

  title = 'CashCalc';

  constructor() {}

  ngOnInit(): void {}

  toggleMenu = (): void => {
    this.menuStatus = !this.menuStatus;
  };

  openLogin = (): void => {
    this.loginMenu = true;
  };

  closeLogin = (): void => {
    this.loginMenu = false;
  };
}
