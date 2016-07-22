import { Component } from '@angular/core';

import {CanvasComponent} from './canvas/canvas.component'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [CanvasComponent]
})
export class AppComponent {
  title = 'Metabubbles!';
}
