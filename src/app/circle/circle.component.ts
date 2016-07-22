import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: '[app-circle]', //attribute selector instead of custom selector
  templateUrl: 'circle.component.html',
  styleUrls: ['circle.component.css']
})

export class CircleComponent implements OnInit {

	@Input() circle;

	constructor() { }

	ngOnInit() {
	}
}
