import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularDraggableModule } from 'angular2-draggable';
import { SvgCircleModule, SvgLineModule, SvgPolygonModule,
  SvgPolylineModule, SvgTextModule, SvgPathModule, SvgEllipseModule } from 'angular-svg';
import {MatTooltipModule} from '@angular/material/tooltip';

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
import { RheemService } from './services/rheem.service';
import { RheemPlanService } from './services/rheemplan.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PinningjobService} from './services/pinningjob.service';
import { DetailjobService} from './services/detailjob.service';
import { PinAreaComponent } from './pin-area/pin-area.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { NodeModalComponent } from './node-modal/node-modal.component';
import { ActionButtonModalComponent } from './action-button-modal/action-button-modal.component';
import {MenuDrawService} from './services/menuDraw.service';
import { ActionButtonModalSaveComponent } from './action-button-modal-save/action-button-modal-save.component';
import { ModalBroadcastComponent } from './modal-broadcast/modal-broadcast.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { ModalExecResponseComponent } from './modal-exec-response/modal-exec-response.component';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  }
];

// @ts-ignore
// @ts-ignore
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
    NodeModalComponent,
    ActionButtonModalComponent,
    ActionButtonModalSaveComponent,
    ModalBroadcastComponent,
    ModalExecResponseComponent
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
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatRadioModule,
    MatButtonModule
],
  entryComponents: [
    NodeComponent,
    NodeInitComponent,
    LineComponent,
    JobsPinComponent,
    JobsModalComponent,
    NodeModalComponent,
    ActionButtonModalComponent,
    ActionButtonModalSaveComponent,
    ModalBroadcastComponent,
    ModalExecResponseComponent
  ],
  providers: [
    RheemService,
    PinningjobService,
    DetailjobService,
    RheemPlanService,
    MenuDrawService,
 //   {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
