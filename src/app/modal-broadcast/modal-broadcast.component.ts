import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatLabel, MatInput} from '@angular/material';
import {Operator} from '../rheem-class/Operator';
import {NodeComponent} from '../node/node.component';

@Component({
  selector: 'app-modal-broadcast',
  templateUrl: './modal-broadcast.component.html',
  styleUrls: ['./modal-broadcast.component.css']
})
export class ModalBroadcastComponent implements OnInit {

  selectedTarget: any;
  classOutputSelected: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    /*Corresponde a un node component*/
    this.selectedTarget = null;
  }

  updateOperator(event) {
    this.selectedTarget = (event.value);
    /*const node: NodeComponent = (event.value);*/
    // console.log(this.selectedTarget);
  }
}
