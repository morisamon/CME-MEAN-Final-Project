import { Component } from '@angular/core';
import {TaskService} from './services/task.service';
import { DataService } from './services/DataService/data.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls:['./app.component.css'],
  providers:[TaskService, DataService]
})

export class AppComponent {

  public StartTrain(){
    console.log("Train");
  }

  public StartGame(){
    console.log("Game");

  }

}
