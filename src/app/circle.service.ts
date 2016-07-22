import { Injectable } from '@angular/core';
import {CONFIG} from './config'

@Injectable()
export class CircleService {

	conf;
	pairs;
	originalCircles=[];
	circleMap = new Map<number[],{x:number, y:number, r:number, visible:boolean, fill:string}>();
	timeStep=0;
	public circles=[];

	constructor(conf: CONFIG) { 
		this.conf=conf;
		for(let i=0; i<100; i++) {
			this.originalCircles.push({
				x: this.randInt(conf.canvasWidth),
				y: this.randInt(conf.canvasHeight),
				r: this.randInt(100) + 10,
				xMove: this.randInt(5) - 2,
				yMove: this.randInt(5) - 2
			});
		}

		this.pairs = [];
		for (let i = 0 ; i < this.originalCircles.length - 1 ; i++) {
			for (let j = i ; j < this.originalCircles.length - 1 ; j++) {
			  this.pairs.push([this.originalCircles[i], this.originalCircles[j + 1]]);
			}
		}
	}

	update() {
		this.timeStep++;
		for(let originalCircle of this.originalCircles) {
			this.moveCircle(originalCircle);
		}
		this.collisionDetection();
	}

	moveCircle(circle) {
		circle.x += circle.xMove +0.5;
		circle.y += circle.yMove +0.5;
		//coordinate wrap-around
		if (circle.x > (this.conf.canvasWidth + circle.r)) {
	      circle.x = 0 - circle.r;
	    }
	    if (circle.x < (0 - circle.r)) {
	      circle.x = this.conf.canvasWidth + circle.r;
	    }
	    if (circle.y > (this.conf.canvasHeight + circle.r)) {
	      circle.y = 0 - circle.r;
	    }
	    if (circle.y < (0 - circle.r)) {
	      circle.y = this.conf.canvasHeight + circle.r;
	    }
	}

	randInt(max) {
		return Math.floor(Math.random() * max);
	}

	distance(circle1, circle2) {
		return Math.sqrt(
			// x2+y2=z2
			(circle2.x - circle1.x) ** 2 +
			(circle2.y - circle1.y) ** 2
		);
	}

	collisionDetection(){
		for (const pair of this.pairs) {
			const [left, right] = pair;
			const dist = this.distance(left, right);
			const overlap = dist - left.r - right.r;
			if (overlap < 0) {
			  // Overlap!
			  	this.drawCollisionCircle(pair, overlap);
			} else if (this.circleMap.has(pair)) {
				this.circleMap.get(pair).visible=false;
			}
		}
	}

	drawCollisionCircle(pair, overlap){
	    // midpoint = average of the two coordinates
	    const [left, right] = pair;
	    let midX = (left.x + right.x) / 2;
	    let midY = (left.y + right.y) / 2;
	    let r = -overlap / 2;
	    let collisionCircle = this.circleMap.get(pair);
	    if (collisionCircle) {
			collisionCircle.x = midX;
			collisionCircle.y = midY;
			collisionCircle.r = r;
	    } else {
	    	collisionCircle = {x: midX, y: midY, r: -overlap / 2, visible:false, fill:''};
		  	this.circles.push(collisionCircle);
		  	this.circleMap.set(pair, collisionCircle);
	    }
	    if (!collisionCircle.visible) {
	        collisionCircle.visible = true;
	        // const red = this.timeStep % 256;
	        // const green = this.timeStep % 256;
	        // const blue = this.timeStep % 256;
	        const red = this.timeStep % 256;
	        const green = (85 + this.timeStep) % 256;
	        const blue =  (85 + 85 + this.timeStep) % 256;
	        collisionCircle.fill = `rgba(${red}, ${green}, ${blue}, 0.5)`;
	      }
	}


}
