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
  pathPoint = [
    {
      l: 'M',
      x: 135.00,
      y: 245.00,
      s: ' '
    },
    {
      l: '',
      x: 135.00,
      y: 110.00,
      s: ' '
    },
    {
      l: '',
      x: 345.00,
      y: 110.00,
      s: ' '
    },
    {
      l: '',
      x: 345.00,
      y: 245.00,
      s: ' '
    },
    {
      l: '',
      x: 345.00,
      y: 380.00,
      s: ' '
    },
    {
      l: '',
      x: 135.00,
      y: 380.00,
      s: ' '
    },
    {
      l: '',
      x: 135.00,
      y: 800.00,
      s: ''
    },
  ];
  constructor() {

  }

  ngOnInit() {
    this.pathString = 'M150 0 L75 300 L225 500 ';
     this.pathString = this.constructPath(this.pathPoint);
  }



  constructPath(pathPoints) {
    let pathD = '';
    pathPoints.forEach((coordinate) => {
      pathD = pathD + coordinate.l + coordinate.x + ',' + coordinate.y + coordinate.s;
    });
    return pathD;
  }

}
