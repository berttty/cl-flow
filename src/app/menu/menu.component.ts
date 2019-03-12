import {Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faChild } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faCoins, faHammer, faBrain, faPuzzlePiece, faBullseye, faChild);
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
  isOpen = false;
  navigationSubState: { [menu: string]: string} = {
    sub_1: 'close',
    sub_2: 'close',
    sub_1_1: 'close'
  };
  constructor() { }

  ngOnInit() {
  }

  menuHeaderAction() {
    if ( this.isOpen ) {
      Object
        .keys(this.navigationSubState)
        .forEach( (value: string) => {
          this.closeSubMenu(value);
        }
      );
    }
    this.isOpen = ! this.isOpen;
  }

  toggleNavigationSub(menuName: string) {
    if (!this.isOpen) {
      this.menuHeaderAction();
    }
    this.navigationSubState[menuName] = (this.navigationSubState[menuName] === 'close' ? 'open' : 'close');
  }

  closeSubMenu(menuName: string) {
    this.navigationSubState[menuName] =  'close';
  }

}
