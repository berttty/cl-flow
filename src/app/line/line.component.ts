import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Stroke } from 'angular-svg';
import {NodeComponent} from '../node/node.component';
import {Operator} from '../rheem-class/Operator';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements AfterViewInit {

  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  private el: HTMLCanvasElement;
  public index: number;
  // TODO Rodrigo: deben ser dos lista una para los anteriores y una para los siguientes
  public nodeListReference: NodeComponent[];
  private distance: number;

  constructor() {
    this.nodeListReference = [];
  }

  ngAfterViewInit() {
    console.log('actuando');
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    this.draw();
  }


  private draw() {
    this.context.font = '30px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';

    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
    // this.context.fillText('@realappie', x, y);
  }

  public draw2(x1, y1, x2, y2, color) {
    this.el = this.canvasEl.nativeElement as HTMLCanvasElement;
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.context.font = '30px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';

    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
    // this.context.fillText('@realappie', x, y);

    /* Old version
    this.context.beginPath();
    this.context.moveTo( x1, y1 + 50);
    this.context.lineTo(x2, y2 + 50);
    this.context.stroke();
*/


    this.context.lineWidth = 1;
    this.context.lineJoin = this.context.lineCap = 'round';
    this.context.strokeStyle = color;
    this.context.lineWidth = 5;

    this.context.beginPath();

    this.distance = 0;
    if (color === 'purple') {
      this.distance = 50;
    } else {
      this.distance = 60;
    }

    this.context.moveTo(x1, y1 + this.distance);
    this.context.lineTo(x2, y2 + this.distance);
    this.context.stroke();




    const vectY = y2 - y1;
    const vectX = x2 - x1;

    const modY = Math.pow(vectY, 2);
    const modX = Math.pow(vectX, 2);

    const module = Math.sqrt(modX + modY);

    const vecUniY = vectY / module;
    const vecUniX = vectX / module;

    const vectranspX = vecUniX * Math.cos(0.45) - vecUniY * Math.sin(0.45);
    const vectranspY = vecUniX * Math.sin(0.45) + vecUniY * Math.cos(0.45);

    const modtranspY = Math.pow(vectranspY, 2);
    const modtranspX = Math.pow(vectranspX, 2);

    const moduletransp = Math.sqrt(modtranspX + modtranspY);

    console.log('module: ' + moduletransp);

    const middlePointX = x2 - (vecUniX * 0.9 * module / 2);
    const middlePointY = y2 - (vecUniY * 0.9 * module / 2) + this.distance;

    const diff1X = middlePointX - (vectranspX * 25);
    const diff1Y = middlePointY - (vectranspY * 25);

    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.moveTo(middlePointX, middlePointY);
    this.context.lineTo(diff1X, diff1Y);
    this.context.stroke();

    const vectransp2X = vecUniX * Math.cos(-0.45) - vecUniY * Math.sin(-0.45);
    const vectransp2Y = vecUniX * Math.sin(-0.45) + vecUniY * Math.cos(-0.45);
    const diff2X = middlePointX - (vectransp2X * 25);
    const diff2Y = middlePointY - (vectransp2Y * 25);
    this.context.beginPath();
    this.context.strokeStyle = color;
    this.context.moveTo(middlePointX, middlePointY);
    this.context.lineTo(diff2X, diff2Y);
    this.context.stroke();

/*
    this.context.beginPath();
    this.context.strokeStyle = 'red';
    this.context.moveTo(x2 - (vecUniX * 40), y2 - (vecUniY * 40) + this.distance);
    this.context.lineTo(x2 + (vecUniX * 60), y2 + (vecUniY * 60) + this.distance);
    this.context.stroke();*/
/*
    this.context.beginPath();
    this.context.strokeStyle = 'red';
    this.context.moveTo(x2 - (vecUniX * 40), y2 - (vecUniY * 40));
    this.context.lineTo(x2 - (vecUniX * 60), y2 - (vecUniY * 40));
    // this.context.arc(x2 - (vecUniX * 40), y2 - (vecUniY * 40), 50, 0, 2 * Math.PI);
    this.context.stroke();
    Unitary direction
    const vectY = y2 - y1;
    const vectX = x2 - x1;

    const modY = Math.pow(vectY, 2);
    const modX = Math.pow(vectX, 2);

    const module = Math.sqrt(modX + modY);

    const vecUniY = vectY / module;
    const vecUniX = vectX / module;

    console.log('Diferencial Ball Y: ' + (vecUniY * 40));
    console.log('Diferencial Ball X: ' + (vecUniX * 40));

    this.context.beginPath();
    this.context.arc(x1 + (vecUniX * 40), y1 + (vecUniY * 40), 50, 0, 2 * Math.PI);
    this.context.stroke();*/
  }
  /*
    drawCurvedLine(x1: number, y1: number, x2: number, y2: number, tension: number) {
      console.log('dibujando linea en ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);
      const delta = (x2 - x1) * tension;
      const hx1 = x1 + delta;
      const hy1 = y1;
      const hx2 = x2 - delta;
      const hy2 = y2;
      this.pathString = 'M ' + x1 + ' ' + y1 + ' C ' + hx1 + ' ' + hy1 + ' ' + hx2 + ' ' + hy2 + ' ' + x2 + ' ' + y2;
    }*/

  public getOperatorPrevious(index?: number): Operator {
    if ( index === undefined ) {
      index = 0;
    }
    return this.nodeListReference[index].getOperator();
  }
}
