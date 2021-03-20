import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'converter';
  myLatex: String = ' 4+\frac{d}{dx}(x)+k+\frac{d}{dx} ';

  // 4+\frac{d}{dx}(xcdot\frac{x}{2})+5*\frac{d}{dx}(x^4+3)+4  ERROR

  // Derivative

  // \frac{d}{dx}x\frac{x}{2}
  // \frac{d}{dx}(x\cdot\frac{x}{2})

  //  \frac{d}{dx}(x^3+\frac{d}{dx}x^4)    //Härtefall-> Derivative im Derivative

  myConverted: String = '';
  mySecondConvert: String = '';

  ngOnInit() {
    this.myConverted = this.myLatex;

    while (this.myConverted.indexOf('\frac') >= 0) {
      console.log('WHILE_1');
      this.myConverted = this.myConverted.replace('\frac', 'frac');
    }

    while (this.myConverted.indexOf('frac') >= 0) {
      console.log('WHILE_2');
      this.myConverted = this.runConverter(this.myConverted);
    }

    this.myConverted = this.myConverted.replace(/{/g, '(');
    this.myConverted = this.myConverted.replace(/}/g, ')');
    //-----DERIVATIVE------------------------------------------------------------
    this.mySecondConvert = this.myConverted;

    while (this.mySecondConvert.indexOf('(d)/(dx)') >= 0) {
      console.log('indexOf: ', this.mySecondConvert.indexOf('(d)/(dx)'));
      this.mySecondConvert = this.runDerivateConverter(this.mySecondConvert);
    }
  }

  runConverter(str) {
    let brackedCount = 0;
    let start: number = str.indexOf('frac') + 4;
    for (let i = start; i < str.length; i++) {
      console.log('FOR_3');
      if (str.charAt(i) == '{') {
        brackedCount++;
      } else if (str.charAt(i) == '}') {
        brackedCount--;
      }
      if (brackedCount == 0) {
        str = str.slice(0, i + 1) + '/' + str.slice(i + 1);
        str = str.replace('frac', '');
        break;
      }
    }
    str = str.replace(/cdot/g, '*');
    return str;
  }

  runDerivateConverter(str) {
    let brackedCount = 0;
    let start: number = str.indexOf('(d)/(dx)') + 8;
    for (let i = start; i < str.length; i++) {
      console.log('FOR_4');
      console.log('STR_Length: ', str.length);
      if (str.charAt(i) == '{') {
        brackedCount++;
      } else if (str.charAt(i) == '}') {
        brackedCount--;
      }
      if (brackedCount == 0) {
        str = str.replace(
          '(d)/(dx)',
          ' math.derivative("x^2+2^x", "x", { simplify: false }).toString() '
        );
        break;
      }
    }

    return str;
  }
}
