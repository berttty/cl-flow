import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


library.add(faPlay);

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: [
    './action-button.component.css',
    './action-button.save.component.css',
  ]
})
export class ActionButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
