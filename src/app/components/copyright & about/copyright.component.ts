import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {

  copyrights: String;

  constructor() {
    this.copyrights = "All rights reserved to CME Team";
  }

  ngOnInit() {
  }

}
