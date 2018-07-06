import { Component } from '@angular/core';
import {TaskService} from './services/task.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls:['./app.component.css'],
  providers:[TaskService]
})

export class AppComponent {

  public StartTrain(){
    console.log("Train");
  }

  public StartGame(){
    console.log("Game");

  }

}
