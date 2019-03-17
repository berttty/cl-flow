import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {JobsPinComponent} from '../jobs-pin/jobs-pin.component';
import {PinningjobService} from '../services/pinningjob.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pin-area',
  templateUrl: './pin-area.component.html',
  styleUrls: ['./pin-area.component.css']
})
export class PinAreaComponent implements OnInit {
  @ViewChild('viewPinContainerRef', { read: ViewContainerRef }) VCR_job_pin: ViewContainerRef;
  indexPin = 0;
  pinReference = [];
  subscription: Subscription;

  constructor(private factoryResolver: ComponentFactoryResolver, private service: PinningjobService) {
    console.log('Pin Job Action');
    this.subscription = service.pinning$.subscribe(
      id => {
        console.log('generating pin-job for card: ' + id);
        this.createPin(id);
      }
    );
  }

  ngOnInit() {
  }

  pinningJob() {
    console.log('Pin Function: ' + this.indexPin);
    // this.service.pinnedStatusMethod(this.);
  }

  createPin(id: string){
    const componentFactory = this.factoryResolver.resolveComponentFactory(JobsPinComponent);
    const componentRef: ComponentRef<JobsPinComponent> = this.VCR_job_pin.createComponent(componentFactory);
    const currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.indexPin;

    // providing parent Component reference to get access to parent class methods
    currentComponent.pinAreaInteraction = this;
    // add reference for newly created component
    this.pinReference.push(componentRef);
  }

  removePin(index: number) {
    if (this.VCR_job_pin.length < 1) {
      return;
    }
    const componentRef = this.pinReference.filter(x => x.instance.index === index)[0];
    const component: JobsPinComponent = componentRef.instance as JobsPinComponent;
    const vcrIndex: number = this.VCR_job_pin.indexOf(componentRef);

    // removing component from container
    this.VCR_job_pin.remove(vcrIndex);
    this.pinReference = this.pinReference.filter(x => x.instance.index !== index);
  }
}
