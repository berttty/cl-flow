import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatLabel, MatInput, MatRadioButton} from '@angular/material';

@Component({
  selector: 'app-action-button-modal-save',
  templateUrl: './action-button-modal-save.component.html',
  styleUrls: ['./action-button-modal-save.component.css']
})
export class ActionButtonModalSaveComponent implements OnInit {
  public optionSave: string;

  constructor(
    public dialogRef: MatDialogRef<ActionButtonModalSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

