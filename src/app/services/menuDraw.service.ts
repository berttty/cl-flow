import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuDrawService {

  // Observable string sources
  private request = new Subject<any[]>();
  private answer = new Subject<string>();

  // Observable string streams
  requestQueue$ = this.request.asObservable();
  answerQueue$ = this.answer.asObservable();

  generateRequest(posX: number, posY: number, item): void {
    console.log('generating request');
    console.log(item);
    this.request.next([posX, posY, item]);
  }

  generateAnswer(answer: string): void {
    console.log('generating answer');
    this.answer.next(answer);
  }
}
