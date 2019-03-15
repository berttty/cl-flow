import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {PinningjobService} from '../services/pinningjob.service';
import { Subscription } from 'rxjs';

library.add(faTimes);

@Component({
  selector: 'app-jobs-pin',
  templateUrl: './jobs-pin.component.html',
  styleUrls: ['./jobs-pin.component.css'],
})
export class JobsPinComponent implements OnInit {

  subscription: Subscription;
  card = '';

  constructor(private service: PinningjobService) {
    console.log('Pin Job Action');
    this.subscription = service.pinning$.subscribe(
      id => {
        console.log('generating pin-job for card: ' + id);
        this.card = id;
      }
    );
  }

  ngOnInit() {
  }

  pinningJob() {
    console.log('Pin Function: ' + this.card);
    this.service.pinnedStatusMethod(this.card);
  }
}
