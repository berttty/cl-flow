import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PinningjobService {

  // Observable string sources
  private pinningJob = new Subject<string>();
  private pinnedStatus = new Subject<string>();

  // Observable string streams
  pinning$ = this.pinningJob.asObservable();
  status$ = this.pinnedStatus.asObservable();

  // Service message commands
  pinningJobMethod(id: string) {
    console.log('here');
    this.pinningJob.next(id);
  }

  pinnedStatusMethod(id: string) {
    console.log('here233');
    this.pinnedStatus.next(id);
  }
}
