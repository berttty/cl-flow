import { Component, OnInit } from '@angular/core';
import {DetailjobService} from '../services/detailjob.service';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-jobs-modal',
  templateUrl: './jobs-modal.component.html',
  styleUrls: ['./jobs-modal.component.css']
})
export class JobsModalComponent implements OnInit {

  subscription: Subscription;
  card = '';

  constructor(private serveDetail: DetailjobService) {
    console.log('Detail Job Action');
    this.subscription = serveDetail.detailing$.subscribe(
      id => {
        console.log('generating detail-job for card: ' + id);
        this.card = id;
      }
    );
  }

  ngOnInit() {
  }

  servingDetail() {
    console.log('Detail Function: ' + this.card);
    this.serveDetail.detailedStatusMethod(this.card);
  }
}
