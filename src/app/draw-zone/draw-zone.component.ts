import { Component, OnInit, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { NodeInitComponent } from '../node-init/node-init.component';
import {LineComponent} from '../line/line.component';
import {Operator} from '../rheem-class/Operator';
import {FilterOperator} from '../rheem-class/unary-operator/FilterOperator';
import {TextFileSink} from '../rheem-class/sink-operator/TextFileSink';
import {TextFileSource} from '../rheem-class/source-operator/TextFileSource';
import {OperatorFactory} from '../rheem-class/factory/OperatorFactory';
import {EmptyOperator} from '../rheem-class/special-operator/EmptyOperator';
import {RheemPlan} from '../rheem-class/RheemPlan';

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.css']
})
export class DrawZoneComponent implements OnInit {

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  @ViewChild('viewLineContainerRef', { read: ViewContainerRef }) VCRLines: ViewContainerRef;

  indexNode = 0;
  indexNodeInit = 0;
  indexLineInit = 0;
  nodeListReference = [];
  nodeInitListReference = [];
  lineListReference = [];

  // TODO eliminar es para test
  private rheemPlan: RheemPlan;
  plan = '';
  // TODO eliminar es para test

  lineStructure;

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.rheemPlan = new RheemPlan();
  }

  ngOnInit() {
  }

  createNodeInit() {
    const componentFactory = this.factoryResolver.resolveComponentFactory(NodeInitComponent);
    const componentRef: ComponentRef<NodeInitComponent> = this.VCR.createComponent(componentFactory);
    const currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.indexNodeInit;

    // providing parent Component reference to get access to parent class methods
    currentComponent.compInteraction = this;
    currentComponent.moveTo(200, 300);
    // add reference for newly created component
    this.nodeInitListReference.push(componentRef);
  }

  createNode(type?: string, posX?: number, posY?: number, previous?: number, operator?: Operator, configuration?: any) {
    if (previous !== undefined) {
      const nodePreviousRef = this.nodeListReference.filter( x => x.instance.index === previous)[0];
      const nodePrevious: NodeComponent = nodePreviousRef.instance as NodeComponent;
      if (operator === undefined) {
        operator = OperatorFactory.buildOperator(nodePrevious.confNextOperator);
      }
      if (configuration === undefined) {
        configuration = nodePrevious.confNextOperator;
      }

      const previousPosition = nodePrevious.getPosition();
      if (posY === undefined) {
        posY = previousPosition.y + 200;
      }
      if (posX === undefined) {
        posX = previousPosition.x + 200;
      }

      posX = previousPosition.x + 200;
      posY = previousPosition.y;

    }
    const componentFactory = this.factoryResolver.resolveComponentFactory(NodeComponent);
    const componentRef: ComponentRef<NodeComponent> = this.VCR.createComponent(componentFactory);
    const currentComponent = componentRef.instance;
    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.indexNode;
    operator =  (operator === undefined ? new EmptyOperator() : operator);
    currentComponent.setOperator( operator );
    currentComponent.selfConfOperator = configuration;
    this.rheemPlan.addOperator(operator);
    this.plan = this.rheemPlan.toString();
    // providing parent Component reference to get access to parent class methods
    currentComponent.compInteraction = this;

    // add reference for newly created component
    this.nodeListReference.push(componentRef);
    if (type !== undefined) {
      currentComponent.icon = type;
    }

    if (posY !== undefined && posX !== undefined) {
      currentComponent.moveTo(posX, posY);
    }

    if (previous !== undefined) {
      currentComponent.previous = previous;
      const nodePreviousRef = this.nodeListReference.filter( x => x.instance.index === previous)[0];
      const nodePrevious: NodeComponent = nodePreviousRef.instance as NodeComponent;
      const previousPosition = nodePrevious.getPosition();
      const currentID = this.drawLines(previousPosition.x, previousPosition.y, posX, posY, nodePrevious, currentComponent);

      nodePrevious.lines.push(currentID);
      currentComponent.lines.push(currentID);

      console.log('nodePrevious: ' + nodePrevious.index + ' numero: ' + nodePrevious.lines.length);

      let i: number;
      for (i = 0; i < nodePrevious.lines.length; i++) {
        console.log(nodePrevious.lines[i]);
      }

      console.log('currentComponent: '  + currentComponent.index + 'numero: ' + currentComponent.lines.length);

      for (i = 0; i < currentComponent.lines.length; i++) {
        console.log(currentComponent.lines[i]);
      }
    }

  }

  removeNode(index: number) {
    const componentRef = this.nodeListReference.filter(x => x.instance.index === index)[0];
    const component: NodeComponent = componentRef.instance as NodeComponent;
    const vcrIndex: number = this.VCR.indexOf(componentRef);

    console.log(component);

    let i: number;
    for (i = 0; i < component.lineListReference.length; i++) {

      // TODO Eliminar referencia a la linea en el otro nodo no eliminado
      console.log(component.lineListReference[i]);
      const vcrLineIndex: number = this.VCRLines.indexOf(component.lineListReference[i]);
      this.VCRLines.remove(vcrLineIndex);
    }

    // removing component from container
    this.VCR.remove(vcrIndex);

    this.nodeListReference = this.nodeListReference.filter(x => x.instance.index !== index);
  }

  moveNode(index: number) {

  }


  removeNodeInit(index: number, operator?: Operator, configuration?: any) {
    if (this.VCR.length < 1) {
      return;
    }
    const componentRef = this.nodeInitListReference.filter(x => x.instance.index === index)[0];
    const component: NodeInitComponent = componentRef.instance as NodeInitComponent;
    const vcrIndex: number = this.VCR.indexOf(componentRef);
    this.createNode(component.getType(), component.position.x, component.position.y, undefined, operator, configuration);


    // removing component from container
    this.VCR.remove(vcrIndex);
    this.nodeInitListReference = this.nodeInitListReference.filter(x => x.instance.index !== index);
  }

  createNext(index: number) {
    if (this.VCR.length < 1) {
      return;
    }
    const componentRef = this.nodeListReference.filter(x => x.instance.index === index)[0];
    const component: NodeComponent = componentRef.instance as NodeComponent;

    this.createNode(component.getType(), component.position.x, component.position.y, index);
  }

  // TODO eliminar es para test
  showPlan() {
     const source: Operator = new TextFileSource('sources', 'file:///Users/notjarvis/IdeaProjects/rheem-rest/some-lines.txt');
     const filter: Operator = new FilterOperator('filter', source.getClassOutput(), 'dataPoint.length() > 5');
     const sink: Operator = new TextFileSink('sink', 'file:///Users/notjarvis/IdeaProjects/rheem-rest/output.txt', filter.getClassOutput());
     source.createConnexion(0, filter, 0);
     filter.createConnexion(0, sink, 0);
     const list = [source, filter, sink];
     this.plan = `{"operators" : [${list.join(' , ')}], "sink_operators" : [ "${sink.getName()}" ]}`;

  }

  drawLines(pastX, pastY, predX, predY, prev, curr): number {

      const componentFactory = this.factoryResolver.resolveComponentFactory(LineComponent);
      const componentRef: ComponentRef<LineComponent> = this.VCRLines.createComponent(componentFactory);
      const currentComponent = componentRef.instance;
      currentComponent.index = ++this.indexLineInit;

      currentComponent.draw2(pastX, pastY, predX, predY);

      curr.lineListReference.push(componentRef);
      prev.lineListReference.push(componentRef);

      currentComponent.nodeListReference.push(curr);
      currentComponent.nodeListReference.push(prev);

      return currentComponent.index;

  }
/*
  drawLine() {

    const componentFactory = this.factoryResolver.resolveComponentFactory(LineComponent);
    const componentRef: ComponentRef<LineComponent> = this.VCR.createComponent(componentFactory);
    const currentComponent = componentRef.instance;

    const nodePreviousRef = this.nodeListReference.filter( x => x.instance.index === 1)[0];
    const nodePrevious: NodeComponent = nodePreviousRef.instance as NodeComponent;

    const nodecurrRef = this.nodeListReference.filter( x => x.instance.index === 2)[0];
    const nodecurr: NodeComponent = nodecurrRef.instance as NodeComponent;

    const posX = nodePrevious.getPosition().x;
    const posY = nodePrevious.getPosition().y;
    const posX2 = nodecurr.getPosition().x;
    const posY2 = nodecurr.getPosition().y;

    const bodyRect = document.body.getBoundingClientRect();
    const elemRect = document.getElementById('primero-' + 1).getBoundingClientRect();
    const elemRect2 = document.getElementById('primero-' + 2).getBoundingClientRect();
    const offsetY   = elemRect.top - bodyRect.top;
    const offsetX = elemRect.left - bodyRect.left;
    const offsetY2   = elemRect2.top - bodyRect.top;
    const offsetX2 = elemRect2.left - bodyRect.left;

    console.log(elemRect);
    console.log(elemRect2);

    currentComponent.draw2(posX, posY, posX2, posY2);

  }*/
}
