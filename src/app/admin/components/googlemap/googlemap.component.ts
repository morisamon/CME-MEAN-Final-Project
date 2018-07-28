import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Router } from '@angular/router';
import { Kid } from '../../Kid';


@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})

export class GoogleMapComponent { 

  kids: Kid[];
  lat: number = 51.678418;
  lng: number = 7.809007;
  
  constructor(
    private kidsService: KidsService,
    private router: Router) 
  { }

  ngOnInit() {    
    this.kidsService.getKids()
    .subscribe(kids => {
        this.kids = kids;
    });  
  }



}