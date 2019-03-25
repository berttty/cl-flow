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
import {map} from 'rxjs/operators';


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

  constructor(private rheemService: RheemService, private rheemPlanService: RheemPlanService, public dialog: MatDialog) {
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
    console.log('preExecute');
    this.rheemPlanService.generateRequest(  '' + this.indexRequest++ );
  }

  doExecute(plan: RheemPlan): void {
    console.log('doExecute');
    this.rheemService.execute(plan.toString());
  }

  preSave(): void {
    this.rheemPlanService.generateRequestMeta('' + this.indexRequest++ );
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
          this.rheemService.getPlan(result).subscribe(a => this.plotRheemPlan(a));
        });
        return values;
      }
    );
  }

  plotRheemPlan(json: any): void {
    this.rheemPlanService.generateRequestDraw(json);
  }
}
