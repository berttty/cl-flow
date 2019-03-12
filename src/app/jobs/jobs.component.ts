import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: [
    './jobs.component.css',
    './jobs.boton.component.css',
    './jobs.cards.component.css',
  ]
})
export class JobsComponent implements OnInit {
  showCards = false;

  constructor() { }

  ngOnInit() {
  }

  openOption() {
    console.log('change the status');
    console.log(this.showCards);
    this.showCards = ! this.showCards;
  }

}
