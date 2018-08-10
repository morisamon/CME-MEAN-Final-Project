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
  message: String

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

    if (this.validateFields(kid)) {
      this.geocodingService.codeAddress(kid.address).subscribe(data => {
        console.log(data);
        if (data.status == "ZERO_RESULTS" || data.status == "OVER_QUERY_LIMIT") {
          kid.lat = 0;
          kid.lng = 0;
        } else {
          kid.lat = data.results[0].geometry.location.lat;
          kid.lng = data.results[0].geometry.location.lng;
        }
        this.kidsService.addNewKid(kid).subscribe(data => {
          alert(data.msg);
          if(data.success){
            this.router.navigate(['/admin/kidslist']);
          } else {
            this.router.navigate(['/admin/addkid']);
          }
        });
      });
    } else alert(this.message);
  }

  validateFields(kid) {
    if (kid._id == undefined || kid.address == undefined || kid.name == undefined || kid.gender == undefined || kid.age == undefined) {
      this.message = "Please fill all the fileds";
      return false;
    }
    else {
      if (kid._id < 1 || kid._id > 999999999) {
        this.message = "Please insert valid ID";
        return false;
      }
      if (kid.age < 1 || kid.age > 30) {
        this.message = "Please insert age between 1 and 30";
        return false;
      }
    }
    return true;
  }
}