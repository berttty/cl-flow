import {Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {MenuDrawService} from '../services/menuDraw.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { faHdd } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { faSyringe } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import {ActionButtonModalComponent} from '../action-button-modal/action-button-modal.component';
import {RheemService} from '../services/rheem.service';

library.add(
  faBars, faCoins, faHammer, faBrain, faPuzzlePiece,
  faBullseye, faChild, faHdd, faTable, faFileCsv,
  faSyringe, faChartLine, faObjectGroup, faTags, faAngleRight,
  faAngleDoubleRight
);

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('toggleHeight', [
      state('close', style({
        height: '0',
        display: 'none'
      })),
      state('open', style({
        height: '*',
        display: 'block',
        background: 'rgba(0, 0, 0, 0.2)',
        margin: 0,
        padding: 0
      })),
      transition('close => open',  animate('1000ms ease-in')),
      transition('open => close', animate('1000ms ease-out'))
    ])
  ]

})
export class MenuComponent implements OnInit {
  values = [];
  isOpen = false;
  navigationSubState: { [menu: string]: string} = {
    source: 'close',
    relational: 'close',
    raw_data: 'close',
    preparation: 'close',
    ai: 'close',
    data_analitics: 'close',
    binaryOperator: 'close',
    unaryOperator: 'close',
    storage: 'close',
    raw_data_storage: 'close',
    relational_storage: 'close',
  };
  constructor(private menuDrawService: MenuDrawService, private rheemService: RheemService) {

    this.gettingCustomOperators();
    menuDrawService.answerQueue$.subscribe(
      (answer: string) => {
        console.log(answer);
      }
    );

  }

  ngOnInit() {
  }

  menuHeaderAction() {
    if ( this.isOpen ) {
      this.closeMenu();
    }
    this.isOpen = ! this.isOpen;
  }

  toggleNavigationSub(menuName: string, isPrincipal?: boolean) {
    if (!this.isOpen) {
      this.menuHeaderAction();
    }
    if ( isPrincipal !== undefined && isPrincipal === true) {
     this.closeMenu((key: string) => {
       return key !== menuName;
     });
    }
    this.navigationSubState[menuName] = (this.navigationSubState[menuName] === 'close' ? 'open' : 'close');
  }

  closeMenu(filter?: (f: string) => boolean) {
    let start = Object
      .keys(this.navigationSubState);

    if (filter !== undefined) {
      start = start.filter( filter );
    }

    start.forEach( (value: string) => {
      this.closeSubMenu(value);
    });
  }

  closeSubMenu(menuName: string) {
    this.navigationSubState[menuName] =  'close';
  }

  endDrag(event, item) {
    console.log('lalala');
    console.log(event);
    console.log(event.screenX);
    console.log(event.screenY);
    console.log(item);
    this.menuDrawService.generateRequest(event.screenX, event.screenY - 100, item) ;
  }

  gettingCustomOperators() {

    this.rheemService.getList().subscribe(
      res => {
        console.log('rescate!!');
        res.filter(oper => oper.type !== 'plan').forEach((element: any) => {
          console.log(element);
          this.values.push(element);
        });
        /*const dialogRef = this.dialog.open(ActionButtonModalComponent, {width: '800px', data: {list: values}});
        dialogRef.afterClosed().subscribe(result => {
          this.rheemService.getPlan(result).subscribe(a => this.plotRheemPlan(a));
        });
        return values;*/
      }
    );
  }
}
