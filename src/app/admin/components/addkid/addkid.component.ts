import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Router } from '@angular/router';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-addkid',
  templateUrl: './addkid.component.html',
  styleUrls: ['./addkid.component.css']
})

export class AddKidComponent implements OnInit {

  _id: number
  name: String
  gender: String
  age: number
  address: String
  lat: number
  lng: number

  constructor(
    private kidsService: KidsService,
    private geocodingService: GeocodingService,
    private router: Router) { }

  ngOnInit() {      
    
  }

  onAddKidSubmit(){
    const kid = {
      _id: this._id,
      name: this.name,
      gender: this.gender,
      age: this.age,
      address: this.address,
      lat: this.lat,
      lng: this.lng
    }

    if (kid.address != "") {
      this.geocodingService.codeAddress(kid.address).subscribe(data => {
        console.log(data);
        if (data.status == "ZERO_RESULTS") {
          kid.lat = 0;
          kid.lng = 0;
        } else {
          kid.lat = data.results[0].geometry.location.lat;
          kid.lng = data.results[0].geometry.location.lng;
        }
        this.kidsService.addNewKid(kid).subscribe(data => {
          console.log(data.msg);
          if(data.success){
            this.router.navigate(['/admin/kidslist']);
          } else {
            this.router.navigate(['/admin/addkid']);
          }
        });
      });
    }
  }
}