import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
library.add(faCheckCircle, faTasks, faRunning);
import {PinningjobService} from '../services/pinningjob.service';
import { DetailjobService} from '../services/detailjob.service';
import {JobsModalComponent} from '../jobs-modal/jobs-modal.component';

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

  constructor(private service: PinningjobService, private serveDetail: DetailjobService, public dialog: MatDialog) {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(JobsModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
  }

  pinningCard(id: string) {
    console.log('pineando carta: ' + id);
    this.service.pinningJobMethod(id);

  }

  detailingCard(id: string) {
    console.log('detallando carta: ' + id);
    this.serveDetail.detailingJobMethod(id);

  }

  stopJob(id: string) {
    console.log('stop the job');
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
