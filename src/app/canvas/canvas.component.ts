import { Component, OnInit } from '@angular/core';

import {CONFIG} from '../config'
import {CircleComponent} from '../circle/circle.component';
import {CircleService} from '../circle.service'

@Component({
  moduleId: module.id,
  selector: 'app-canvas',
  templateUrl: 'canvas.component.html',
  styleUrls: ['canvas.component.css'],
  directives: [CircleComponent],
  providers: [CircleService]
})
export class CanvasComponent implements OnInit {

	circles=[];
	running=true;
	constructor(private _circleService: CircleService, private conf: CONFIG) {
		this.circles=_circleService.circles;
	}

	ngOnInit() {
		this.running=true;
		this.animationFrame();
	}

	ngOnDestroy() {
		this.running=false;
	}

	getViewBox() {
		return `0 0 ${this.conf.canvasWidth} ${this.conf.canvasHeight}`;
	}

	animationFrame(){
		this._circleService.update();
		if(this.running){
			requestAnimationFrame(() => this.animationFrame());
		}
	}

	toggleRunning(){
		this.running=!this.running;
	}
}
