import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

@Component({
  selector: 'app-jobs-pin',
  templateUrl: './jobs-pin.component.html',
  styleUrls: ['./jobs-pin.component.css']
})
export class JobsPinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
