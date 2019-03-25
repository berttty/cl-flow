import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {RheemPlan} from '../rheem-class/RheemPlan';

@Injectable()
export class RheemPlanService {

  // Observable string sources
  private request = new Subject<string>();
  private answer = new Subject<RheemPlan>();

  private requestMeta = new Subject<string>();
  private answerMeta = new Subject<RheemPlan>();

  private requestDraw = new Subject<any>();
  private answerDraw = new Subject<string>();

  // Observable string streams
  requestQueue$ = this.request.asObservable();
  answerQueue$ = this.answer.asObservable();

  requestMetaQueue$ = this.requestMeta.asObservable();
  answerMetaQueue$ = this.answerMeta.asObservable();

  requestDrawQueue$ = this.requestDraw.asObservable();
  answerDrawQueue$ = this.answerDraw.asObservable();

  generateRequest(id: string): void {
    console.log('generating request');
    this.request.next(id);
  }

  generateAnswer(plan: RheemPlan): void {
    console.log('generating answer');
    this.answer.next(plan);
  }

  generateRequestMeta(id: string): void {
    console.log('generating request');
    this.requestMeta.next(id);
  }

  generateAnswerMeta(plan: RheemPlan): void {
    console.log('generating answer');
    this.answerMeta.next(plan);
  }

  generateRequestDraw(plan: any): void {
    console.log('generating request');
    this.requestDraw.next(plan);
  }

  generateAnswerDraw(answer: string): void {
    console.log('generating answer');
    this.answerDraw.next(answer);
  }
}
