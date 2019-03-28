import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { RheemService } from '../services/rheem.service';
import {RheemPlanService} from '../services/rheemplan.service';
import {RheemPlan} from '../rheem-class/RheemPlan';
import {NodeModalComponent} from '../node-modal/node-modal.component';
import {ActionButtonModalComponent} from '../action-button-modal/action-button-modal.component';
import {MatDialog} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {ActionButtonModalSaveComponent} from '../action-button-modal-save/action-button-modal-save.component';
import { ModalExecResponseComponent } from '../modal-exec-response/modal-exec-response.component';


library.add(faPlay, faFolderOpen, faSave, faCogs);

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: [
    './action-button.component.css',
    './action-button.save.component.css',
  ]
})
export class ActionButtonComponent implements OnInit {

  private indexRequest: number;

  constructor(
        private rheemService: RheemService,
        private rheemPlanService: RheemPlanService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
  ) {
    this.indexRequest = 1;
    rheemPlanService.answerQueue$.subscribe(
      (answer: RheemPlan) => {
          this.doExecute(answer);
      }
    );
    rheemPlanService.answerMetaQueue$.subscribe(
      (answer: RheemPlan) => {
        this.doSave(answer);
      }
    );
    rheemPlanService.answerDrawQueue$.subscribe(
      (answer: string) => {
        console.log('plan ready');
      }
    );
  }

  ngOnInit() {
  }

  preExecute(): void {
    // this.openMessage('Generating Plan');
    this.rheemPlanService.generateRequest(  '' + this.indexRequest++ );
  }

  doExecute(plan: RheemPlan): void {
    // this.openMessage('Starting Execution');
    let response: object;
    if (plan.getScript() === undefined) {
      console.log('Normal: ' + plan.getName());
      response = this.rheemService.execute2('kmeans');
    } else {
      console.log('Hand: ' + plan.getScript());
      this.rheemService.execute2(plan.getScript()).subscribe(res => {
        console.log('respuesta');
        console.log(res);
        const dialogRef = this.dialog.open(ModalExecResponseComponent, {width: '400px', data: res });
        dialogRef.afterClosed().subscribe( result => {
        });
      });
    }



  }

  preSave(): void {
    const dataValues = {};
    const dialogRef = this.dialog.open(ActionButtonModalSaveComponent, {width: '400px', data: dataValues });
    dialogRef.afterClosed().subscribe( result => {
      console.log(dataValues);
      if (result === true) {
        this.rheemPlanService.generateRequestMeta(dataValues);
      }
    });
  }

  doSave(plan: RheemPlan): void {
    this.rheemService.savePlan(plan);
  }

  preOpen() {
    let index = 0;
    this.rheemService.getList().subscribe(
      res => {
        const values = [];
        res.forEach( ( element: any ) => {
          values.push({id: element._id, name: (element.name !== undefined ? element.name : 'Plan ' + index++)});
        });
        const dialogRef = this.dialog.open(ActionButtonModalComponent, {width: '800px', data: {list: values}});
        dialogRef.afterClosed().subscribe( result => {
          console.log('result');
          console.log(result);
          this.rheemService.getPlan(result).subscribe(a => this.plotRheemPlan(a));
        });
        return values;
      }
    );
  }

  plotRheemPlan(json: any): void {
    this.rheemPlanService.generateRequestDraw(json);
  }

  openMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
