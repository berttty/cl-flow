import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuDrawService {

  // Observable string sources
  private request = new Subject<number[]>();
  private answer = new Subject<string>();

  // Observable string streams
  requestQueue$ = this.request.asObservable();
  answerQueue$ = this.answer.asObservable();

  generateRequest(posX: number, posY: number): void {
    console.log('generating request');
    this.request.next([posX, posY]);
  }

  generateAnswer(answer: string): void {
    console.log('generating answer');
    this.answer.next(answer);
  }
}
