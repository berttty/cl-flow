import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DetailjobService {

  // Observable string sources
  private detailingJob = new Subject<string>();
  private detailedStatus = new Subject<string>();

  // Observable string streams
  detailing$ = this.detailingJob.asObservable();
  detailed$ = this.detailedStatus.asObservable();

  // Service message commands
  detailingJobMethod(id: string) {
    console.log('detail');
    this.detailingJob.next(id);
  }

  detailedStatusMethod(id: string) {
    console.log('erw233');
    this.detailedStatus.next(id);
  }
}
