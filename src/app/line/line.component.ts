import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Stroke } from 'angular-svg';

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

  constructor() {

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

  public draw2(x1, y1, x2, y2) {
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
    this.context.strokeStyle = 'purple';
    this.context.lineWidth = 5;

    this.context.beginPath();


    this.context.moveTo(x1, y1 + 50);
    this.context.lineTo(x2, y2 + 50);
    this.context.stroke();

    /*Unitary direction
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
}
