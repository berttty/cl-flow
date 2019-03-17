import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';


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

  constructor() { }

  ngOnInit() {
  }

}
