import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {PinningjobService} from '../services/pinningjob.service';
import { Subscription } from 'rxjs';

library.add(faTimes);

export interface PinJobInterface {
  removePin(index: number);
}

@Component({
  selector: 'app-jobs-pin',
  templateUrl: './jobs-pin.component.html',
  styleUrls: ['./jobs-pin.component.css'],
})
export class JobsPinComponent implements OnInit {
  public index: number;
  public jobsID: string;
  public selfRef: JobsPinComponent;
  public pinAreaInteraction: PinJobInterface;

  constructor() {}

  ngOnInit() {
  }

  removeMe(index: number) {
    this.pinAreaInteraction.removePin(index);
  }

}
