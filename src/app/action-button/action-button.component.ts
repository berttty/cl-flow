import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { RheemService } from '../services/rheem.service';
import {RheemPlanService} from '../services/rheemplan.service';
import {RheemPlan} from '../rheem-class/RheemPlan';


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

  constructor(private rheemService: RheemService, private rheemPlanService: RheemPlanService) {
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

  }
}
