import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'display',
  templateUrl: 'display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  public displayLinks: boolean;
  constructor() { }

  ngOnInit() {
    this.displayLinks=true;
  }

  public StartTrain(){
    console.log("start train!");
    this.displayLinks=false;
  }
  
  public StartGame(){
    console.log("start game!");
    this.displayLinks=false;
  }

}
