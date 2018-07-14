import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/DataService/data.service';

@Component({
  moduleId: module.id,
  selector: 'my-levels',
  templateUrl: 'levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  constructor() {}

  ngOnInit(){
  }

}
