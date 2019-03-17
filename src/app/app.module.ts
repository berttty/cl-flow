import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularDraggableModule } from 'angular2-draggable';
import { SvgCircleModule, SvgLineModule, SvgPolygonModule,
  SvgPolylineModule, SvgTextModule, SvgPathModule, SvgEllipseModule } from 'angular-svg';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EditorComponent } from './editor/editor.component';
import { JobsComponent } from './jobs/jobs.component';
import { NodeComponent } from './node/node.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { JobsPinComponent } from './jobs-pin/jobs-pin.component';
import { JobsModalComponent } from './jobs-modal/jobs-modal.component';
import { DrawZoneComponent } from './draw-zone/draw-zone.component';
import { NodeInitComponent } from './node-init/node-init.component';
import { LineComponent } from './line/line.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdunitService } from './adunit.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PinningjobService} from './services/pinningjob.service';
import { DetailjobService} from './services/detailjob.service';
import * as linemate from 'linemate';
import { PinAreaComponent } from './pin-area/pin-area.component';
import {MatDialogModule} from '@angular/material';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EditorComponent,
    JobsComponent,
    NodeComponent,
    ActionButtonComponent,
    JobsPinComponent,
    JobsModalComponent,
    DrawZoneComponent,
    NodeInitComponent,
    LineComponent,
    PinAreaComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularDraggableModule,
    SvgCircleModule,
    SvgLineModule,
    SvgPolygonModule,
    SvgPolylineModule,
    SvgTextModule,
    SvgPathModule,
    SvgEllipseModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: [
    NodeComponent,
    NodeInitComponent,
    LineComponent,
    JobsPinComponent,
    JobsModalComponent
  ],
  providers: [
    AdunitService,
    PinningjobService,
    DetailjobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
