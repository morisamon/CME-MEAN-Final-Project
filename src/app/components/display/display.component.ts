import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LevelsComponent } from '../levels-menu/levels.component';

@Component({
  selector: 'display',
  templateUrl: 'display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  public displayLinks: boolean;

  constructor() { }

  ngOnInit() {
    this.displayLinks = true;
  }

  public StartTrain(){
    console.log("start train!");
  }
  
  public StartGame(){
    console.log("start game!");
  }

}
