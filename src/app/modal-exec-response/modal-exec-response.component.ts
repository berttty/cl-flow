import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatLabel, MatInput, MatRadioButton} from '@angular/material';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner);
@Component({
  selector: 'app-modal-exec-response',
  templateUrl: './modal-exec-response.component.html',
  styleUrls: ['./modal-exec-response.component.css']
})
export class ModalExecResponseComponent implements OnInit {

  public optionSave: string;

  constructor(
    public dialogRef: MatDialogRef<ModalExecResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
