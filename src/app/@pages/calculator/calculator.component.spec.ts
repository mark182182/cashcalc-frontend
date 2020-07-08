import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CalculatorComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cashcalc-frontend'`, () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cashcalc-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('cashcalc-frontend app is running!');
  });
});
