import { Component } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  faWeightHanging,
  faDollarSign,
  faShieldAlt,
  faShippingFast,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'calculator-root',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  faGlobe = faGlobe;
  faWeightHanging = faWeightHanging;
  faDollarSign = faDollarSign;
  faShieldAlt = faShieldAlt;
  faShippingFast = faShippingFast;

  ngOnInit() {
    //ng
  }

  calculate = (): void => {};
}
