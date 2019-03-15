import { Component, OnInit } from '@angular/core';
import { Stroke } from 'angular-svg';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  routing = undefined;
  public colorstroke: Stroke;
  public pathString: string;

  constructor() {

  }

  ngOnInit() {
  }


  drawCurvedLine(x1: number, y1: number, x2: number, y2: number, tension: number) {
    console.log('dibujando linea en ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);
    const delta = (x2 - x1) * tension;
    const hx1 = x1 + delta;
    const hy1 = y1;
    const hx2 = x2 - delta;
    const hy2 = y2;
    this.pathString = 'M ' + x1 + ' ' + y1 + ' C ' + hx1 + ' ' + hy1 + ' ' + hx2 + ' ' + hy2 + ' ' + x2 + ' ' + y2;
  }
}
