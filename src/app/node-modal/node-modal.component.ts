import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField, MatLabel, MatInput} from '@angular/material';
import {Operator} from '../rheem-class/Operator';
@Component({
  selector: 'app-node-modal',
  templateUrl: './node-modal.component.html',
  styleUrls: ['./node-modal.component.css']
})
export class NodeModalComponent implements OnInit {
  selected: any;
  classOutputSelected: any;

  /*constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }*/
  constructor(
    public dialogRef: MatDialogRef<NodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if (this.data.operator !== undefined) {
      this.selected = this.getNameClass(this.data.operator.className);
      const tmp: Operator = (this.data.operator.getOrigin() !== undefined ? this.data.operator.getOrigin() : this.data.operator);
      this.data.operator = this.data.operator.setTypeOperator(this.selected).setOrigin(tmp);
      this.classOutputSelected = this.data.outputClass;
      console.log(this.classOutputSelected);
    }
  }

  updateOperator(event) {
    const tmp: Operator = (this.data.operator.getOrigin() !== undefined ? this.data.operator.getOrigin() : this.data.operator );
    this.data.operator = this.data.operator.setTypeOperator(event.value).setOrigin(tmp);
  }

  withoutSpace(tmp: string): string {
    return tmp.replace(/ /g, '');
  }

  getNameClass(tmp: string): string {
    if (tmp === undefined) return
    return tmp.split('.').pop();
  }

  updateOutPutClass(event) {
    this.data.outputClass = event.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
