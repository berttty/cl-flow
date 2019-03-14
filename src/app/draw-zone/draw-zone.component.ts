import { Component, OnInit, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { NodeInitComponent } from '../node-init/node-init.component';

@Component({
  selector: 'app-draw-zone',
  templateUrl: './draw-zone.component.html',
  styleUrls: ['./draw-zone.component.css']
})
export class DrawZoneComponent implements OnInit {

  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;

  indexNode = 0;
  indexNodeInit = 0;
  nodeListReference = [];
  nodeInitListReference = [];

  constructor( private factoryResolver: ComponentFactoryResolver) {
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
    currentComponent.moveTo(100, 100);
    // add reference for newly created component
    this.nodeInitListReference.push(componentRef);
  }

  createNode(type?: string, posX?: number, posY?: number) {
    const componentFactory = this.factoryResolver.resolveComponentFactory(NodeComponent);
    const componentRef: ComponentRef<NodeComponent> = this.VCR.createComponent(componentFactory);
    const currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.indexNode;
    if (type !== undefined) {
      currentComponent.icon = type;
    }
    if (posY !== undefined && posX !== undefined) {
      currentComponent.moveTo(posX, posY);
    }

    // providing parent Component reference to get access to parent class methods
    currentComponent.compInteraction = this;

    // add reference for newly created component
    this.nodeListReference.push(componentRef);
  }

  removeNode(index: number, type?: string, posX?: number, posY?: number) {

    if (this.VCR.length < 1) {
      return;
    }

    const componentRef = this.nodeListReference.filter(x => x.instance.index === index)[0];
    const component: NodeComponent = componentRef.instance as NodeComponent;
    const vcrIndex: number = this.VCR.indexOf(componentRef);

    // removing component from container
    this.VCR.remove(vcrIndex);

    this.nodeListReference = this.nodeListReference.filter(x => x.instance.index !== index);
  }

  removeNodeInit(index: number) {
    if (this.VCR.length < 1) {
      return;
    }
    const componentRef = this.nodeInitListReference.filter(x => x.instance.index === index)[0];
    const component: NodeInitComponent = componentRef.instance as NodeInitComponent;
    const vcrIndex: number = this.VCR.indexOf(componentRef);
    this.createNode(component.getType(), component.position.x, component.position.y);


    // removing component from container
    this.VCR.remove(vcrIndex);
    this.nodeInitListReference = this.nodeInitListReference.filter(x => x.instance.index !== index);
  }
}
