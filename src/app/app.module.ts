import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularDraggableModule } from 'angular2-draggable';
import { SvgCircleModule, SvgLineModule, SvgPolygonModule, SvgPolylineModule, SvgTextModule, SvgPathModule, SvgEllipseModule } from 'angular-svg';


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
    SvgEllipseModule
  ],
  entryComponents: [
    NodeComponent,
    NodeInitComponent,
    LineComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
