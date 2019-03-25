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
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {RheemPlanService} from '../services/rheemplan.service';

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

  onMoveNode = null;
  onMoveRelatedNodes = [];
  onDrag: boolean;

  // TODO eliminar es para test
  private rheemPlan: RheemPlan;
  plan = '';
  // TODO eliminar es para test

  lineStructure;

  constructor(private factoryResolver: ComponentFactoryResolver, private rheemPlanService: RheemPlanService) {
    rheemPlanService.requestQueue$.subscribe(
      id => {
        console.log('DrawZone consuming request');
        rheemPlanService.generateAnswer(
          this.generateRheemPlan()
        );
      }
    );
    rheemPlanService.requestMetaQueue$.subscribe(
      id => {
        console.log('DrawZone consuming request');
        rheemPlanService.generateAnswerMeta(
          this.generateRheemPlan(true)
        );
      }
    );
  }

  ngOnInit() {
    this.onDrag = false;
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
    let positionAssigned: {x: number, y: number};
    positionAssigned = this.determinePos(previous);
    const nullPos = {x: 0, y: 200};

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
    // providing parent Component reference to get access to parent class methods
    currentComponent.compInteraction = this;

    // add reference for newly created component
    this.nodeListReference.push(componentRef);
    if (type !== undefined) {
      currentComponent.icon = type;
    }

    if (posY !== undefined && posX !== undefined) {
      if (positionAssigned.x !== nullPos.x && positionAssigned.y !== nullPos.y) {
        posX = positionAssigned.x;
        posY = positionAssigned.y;
      }
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

      currentComponent.predecessorNodesList.push(nodePrevious);
      nodePrevious.successorNodesList.push(currentComponent);

      console.log('nodePrevious.successorNodesList ' + nodePrevious.index);
      let i: number;
      for (i = 0; i < nodePrevious.successorNodesList.length; i++) {
        console.log(nodePrevious.successorNodesList[i].index);
      }

      console.log('currentComponent.predecessorNodesList ' + currentComponent.index);
      for (i = 0; i < currentComponent.predecessorNodesList.length; i++) {
        console.log(currentComponent.predecessorNodesList[i].index);
      }
    }

  }

  removeNode(index: number) {
    const componentRef = this.nodeListReference.filter(x => x.instance.index === index)[0];
    const component: NodeComponent = componentRef.instance as NodeComponent;
    const vcrIndex: number = this.VCR.indexOf(componentRef);

    let i: number;
    for (i = 0; i < component.lineListReference.length; i++) {

      const line: LineComponent = component.lineListReference[i].instance as LineComponent;

      const vcrLineIndex: number = this.VCRLines.indexOf(component.lineListReference[i]);

      let j: number;
      for (j = 0; j < line.nodeListReference.length; j++) {

        const nodeOfList = line.nodeListReference[j];

        /*Eliminando referencia a linea en el otro nodo*/
        if (!(nodeOfList.index === component.index)) {

          let k: number;
          let ind: number;
          for (k = 0; k < nodeOfList.lineListReference.length; k++) {
            const refLine: LineComponent = nodeOfList.lineListReference[k].instance as LineComponent;

            if (refLine === line) {
              ind = k;
              break;
            }
          }
          if (ind > -1) {
            nodeOfList.lineListReference.splice(ind, 1);
          }

          /*let k: number;
          for (k = 0; k < nodeOfList.lineListReference.length; k++) {

          }*/
        }
        // console.log(line.nodeListReference[j]);
      }
      // BORRAR RELACION!!
      /*
      const ind = relatedNode.lineListReference.indexOf(component.lineListReference[i], 0);
      console.log('indice: ' + ind);
      if (ind > -1) {
        relatedNode.lineListReference.splice(ind, 1);
      }*/


      this.VCRLines.remove(vcrLineIndex);
    }

    /*Repasando sucesores*/
    for (i = 0; i < component.successorNodesList.length; i++) {
      const suc = component.successorNodesList[i];

      console.log(suc);
      let indexCurrSuc: number;

      /*Searching the eliminated node in current succesor*/
      let j: number;
      for (j = 0; j < suc.predecessorNodesList.length; j++) {
        const refNode = suc.predecessorNodesList[j];

        if (refNode === component) {
          indexCurrSuc = j;
          break;
        }
      }

      if (indexCurrSuc > -1) {
        suc.predecessorNodesList.splice(indexCurrSuc, 1);
      }
    }

    /*Repasando predecesoress*/
    for (i = 0; i < component.predecessorNodesList.length; i++) {
      const pre = component.predecessorNodesList[i];

      let indexCurrPre: number;

      /*Searching the eliminated node in current succesor*/
      let j: number;
      for (j = 0; j < pre.successorNodesList.length; j++) {
        const refNode = pre.successorNodesList[j];

        if (refNode === component) {
          indexCurrPre = j;
          break;
        }
      }

      if (indexCurrPre > -1) {
        pre.successorNodesList.splice(indexCurrPre, 1);
      }
    }

    // removing component from container
    this.VCR.remove(vcrIndex);

    this.nodeListReference = this.nodeListReference.filter(x => x.instance.index !== index);
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
     this.plan  = `{"operators" : [${list.join(' , ')}], "sink_operators" : [ "${sink.getName()}" ]}`;

  }

  drawLines(pastX, pastY, predX, predY, prev, curr): number {

      const componentFactory = this.factoryResolver.resolveComponentFactory(LineComponent);
      const componentRef: ComponentRef<LineComponent> = this.VCRLines.createComponent(componentFactory);
      const currentComponent = componentRef.instance;
      currentComponent.index = ++this.indexLineInit;

      currentComponent.draw2(pastX, pastY, predX, predY);

      curr.lineListReference.push(componentRef);
      prev.lineListReference.push(componentRef);
      // TODO  rodrigo: porque no se agrega a la lista de refernecia de las lineas??
      // this.lineListReference.push(componentRef);
      currentComponent.nodeListReference.push(curr);
      currentComponent.nodeListReference.push(prev);

      return currentComponent.index;

  }

  removeEdges(index: number) {

    console.log('DRAG: ' + index);
    const componentRef = this.nodeListReference.filter(x => x.instance.index === index)[0];
    const component: NodeComponent = componentRef.instance as NodeComponent;
    const vcrIndex: number = this.VCR.indexOf(componentRef);

    let i: number;
    this.onMoveNode = component;

    this.onMoveRelatedNodes = [];
    // Repasando los edges del nodo
    for (i = 0; i < component.lineListReference.length; i++) {

      let j: number;
      // linea actual
      const line = component.lineListReference[i].instance as LineComponent;

      // Se revisan los nodos asociados al edge, siempre deben ser 2
      for (j = 0; j < line.nodeListReference.length; j++) {
        const relatedNode = line.nodeListReference[j];

        if (relatedNode.index !== component.index) {

          this.onMoveRelatedNodes.push(relatedNode);

          // BORRAR RELACION!!
          const ind = relatedNode.lineListReference.indexOf(component.lineListReference[i], 0);

          if (ind > -1) {
            relatedNode.lineListReference.splice(ind, 1);
          }
        }
        // console.log(line.nodeListReference[i].lineListReference.filter(x => x.instance.index !== j));
      }

      const vcrLineIndex: number = this.VCRLines.indexOf(component.lineListReference[i]);
      this.VCRLines.remove(vcrLineIndex);
      component.lineListReference[i].destroy();
    }

    component.lineListReference = [];
    this.onDrag = true;
  }

  repareEdges(index: number, newX: number, newY: number, oldX: number, oldY: number) {

    console.log('DROP: ' + index);
    if (this.onDrag) {
      const componentRef = this.nodeListReference.filter(x => x.instance.index === index)[0];
      const component: NodeComponent = componentRef.instance as NodeComponent;
      const vcrIndex: number = this.VCR.indexOf(componentRef);


      let i: number;
      const nodesToRelate = [];
      let reposition = false;

      // Revisando si se dropeo sobre otro nodo
      for (i = 0; i < this.nodeListReference.length; i++) {
        const compRefX: ComponentRef<NodeComponent> = this.nodeListReference[i];
        const compX: NodeComponent = compRefX.instance as NodeComponent;

        if (!(component.index === compX.index)) {
          const otherPos = compX.getPosition();

          const dist = Math.sqrt(Math.pow(otherPos.y - newY, 2) + Math.pow(otherPos.x - newX, 2));
          // Si al distancia punto a punto es menor a 80, relacionamos
          // WORKS! Se debe relacionar a MENOS que ya este relacionado
          if (dist <= 80) {
            console.log('podria con: ' + compX.index);
            reposition = true;

            let related = false;
            // Se debe relacionar a MENOS que ya este relacionado
            let j: number;
            for (j = 0; j < this.onMoveRelatedNodes.length; j ++) {
              if (this.onMoveRelatedNodes[j].index === compX.index) {
                related = true;
              }
            }

            // Siempre se debe volver a su lugar original ANTED DE RELACIONAR

            // En este caso, relacionar
            if (related === false) {
              nodesToRelate.push(compX);
            }
          }
        }
      }

      if (reposition) {
        component.moveTo(oldX, oldY);
      } else {
        component.moveTo(newX, newY);
      }

      for (i = 0; i < this.onMoveRelatedNodes.length; i++) {
        const nodePrevious = this.onMoveRelatedNodes[i];
        const previousPosition = nodePrevious.getPosition();

        if (reposition) {
          const currentID = this.drawLines(previousPosition.x, previousPosition.y, oldX, oldY, nodePrevious, component);
        } else {
          const currentID = this.drawLines(previousPosition.x, previousPosition.y, newX, newY, nodePrevious, component);
        }

      }

      /*Relacionando nodos, estos son sucesores de component*/
      for (i = 0; i < nodesToRelate.length; i++) {
        const otherNode = nodesToRelate[i];
        const otherPosition = otherNode.getPosition();

        if (reposition) {
          const currentID = this.drawLines(otherPosition.x, otherPosition.y, oldX, oldY, otherNode, component);
        } else {
          const currentID = this.drawLines(otherPosition.x, otherPosition.y, newX, newY, otherNode, component);
        }

        otherNode.predecessorNodesList.push(component);
        component.successorNodesList.push(otherNode);


        console.log('component.successorNodesList ' + component.index);
        for (i = 0; i < component.successorNodesList.length; i++) {
          console.log(component.successorNodesList[i].index);
        }

        console.log('otherNode.predecessorNodesList ' + otherNode.index);
        for (i = 0; i < otherNode.predecessorNodesList.length; i++) {
          console.log(otherNode.predecessorNodesList[i].index);
        }
      }

      // TEST
      component.close = false;
      component.movement = false;
      this.onDrag = false;
    }
  }

  determinePos(previous: number): {x: number, y: number} {

    let maxPosY = 0;
    let maxPosX = 0;
    if (previous) {
      console.log('hay previo: ' + previous);

      const nodePreviousRef = this.nodeListReference.filter( x => x.instance.index === previous)[0];
      const nodePrevious: NodeComponent = nodePreviousRef.instance as NodeComponent;

      let i: number;
      for (i = 0; i < nodePrevious.lineListReference.length; i++) {

        let j: number;
        // linea actual
        const line = nodePrevious.lineListReference[i].instance as LineComponent;
        for (j = 0; j < line.nodeListReference.length; j++) {
          const relatedNode = line.nodeListReference[j];

          console.log(relatedNode.index);
          console.log(nodePrevious.index);

          if (relatedNode.position.y > maxPosY
            && relatedNode.index !== nodePrevious.index
            && relatedNode.position.x > nodePrevious.position.x) {

            console.log('Entre: ' + relatedNode.index + ' - ' + nodePrevious.index);
            maxPosY = relatedNode.position.y;
            maxPosX = relatedNode.position.x;
          }
        }
      }
    }
    return { x: maxPosX, y: maxPosY + 200 };
  }

  closeAllNodes() {

    let i: number;
    for (i = 0; i < this.nodeListReference.length; i++) {

      const compRefX: ComponentRef<NodeComponent> = this.nodeListReference[i];
      const compX: NodeComponent = compRefX.instance as NodeComponent;

      compX.close = true;
      compX.checkMe();
    }
  }

  generateRheemPlan(withMetaInfo?: boolean): RheemPlan {
    if ( withMetaInfo === undefined ) {
      withMetaInfor = false;
    }
    this.rheemPlan = new RheemPlan();
    this.nodeListReference.forEach((element: ComponentRef<NodeComponent> ) => {
      const first: Operator = element.instance.getOperator();
      this.rheemPlan.addOperator(first);
      let index = 0;
      // TODO bertty: make this method as parametric as we can
      element.instance.successorNodesList.forEach( (node: NodeComponent ) => {
        this.rheemPlan.addConexion(first, 0, node.getOperator(), index);
        index = index + 1;
      });
    });
    this.plan = this.rheemPlan.toString();
    return this.rheemPlan;
  }
}
