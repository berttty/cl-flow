import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatLabel, MatInput} from '@angular/material';
import {Operator} from '../rheem-class/Operator';
@Component({
  selector: 'app-node-modal',
  templateUrl: './node-modal.component.html',
  styleUrls: ['./node-modal.component.css']
})
export class NodeModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  updateOperator(event) {
    const tmp: Operator = (this.data.operator.getOrigin() !== undefined ? this.data.operator.getOrigin() : this.data.operator );
    this.data.operator = this.data.operator.setTypeOperator(event.value).setOrigin(tmp);
  }


}
