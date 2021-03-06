import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatLabel, MatInput} from '@angular/material';

@Component({
  selector: 'app-action-button-modal',
  templateUrl: './action-button-modal.component.html',
  styleUrls: ['./action-button-modal.component.css']
})

export class ActionButtonModalComponent implements OnInit {

  // constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
  constructor(
    public dialogRef: MatDialogRef<ActionButtonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
