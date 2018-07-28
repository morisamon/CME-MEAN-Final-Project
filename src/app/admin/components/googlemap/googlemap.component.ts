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
  zoom: number = 9;
  lat: number = 32.071636;
  lng: number = 34.778535;

  markers: marker[] = [
    
  ]
  
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

interface marker {
	lat: number;
	lng: number;
}