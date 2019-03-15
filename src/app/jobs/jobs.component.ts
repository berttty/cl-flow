import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
library.add(faCheckCircle, faTasks, faRunning);
import {PinningjobService} from '../services/pinningjob.service';
import { DetailjobService} from '../services/detailjob.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: [
    './jobs.component.css',
    './jobs.boton.component.css',
    './jobs.cards.component.css',
  ]
})
export class JobsComponent implements OnInit {
  showCardsLeft = false;
  showCardsRight = false;
  isOpen = false;

  constructor(private service: PinningjobService, private serveDetail: DetailjobService) {
    service.status$.subscribe(
      // Id of the picked card
      id => {
        console.log('picke!');
      }
    );

    serveDetail.detailed$.subscribe(
      // Id of the picked card
      id => {
        console.log('detalle!');
      }
    );
  }

  ngOnInit() {
  }

  PinningCard(id: string) {
    console.log('pineando carta: ' + id);
    this.service.pinningJobMethod(id);

  }

  DetailingCard(id: string) {
    console.log('detallando carta: ' + id);
    this.serveDetail.detailingJobMethod(id);

  }


  openOptionLeft() {
    console.log('change the status Left');
    console.log(this.showCardsLeft);
    this.showCardsLeft = ! this.showCardsLeft;
  }

  openOptionRight() {
    console.log('change the status Right');
    console.log(this.showCardsRight);
    this.showCardsRight = ! this.showCardsRight;
  }

  checkClose(lala) {
    if (this.showCardsLeft || this.showCardsRight) {
      this.showCardsLeft = false;
      this.showCardsRight = false;
    }
  }
}
