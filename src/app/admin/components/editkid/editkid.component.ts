import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Router } from '@angular/router';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-editkid',
  templateUrl: './editkid.component.html',
  styleUrls: ['./editkid.component.css']
})

export class EditKidComponent implements OnInit {

  _id: Number
  name: String
  gender: String
  age: Number
  address: String
  lat: Number
  lng: Number
  message: String

  constructor(
    private kidsService: KidsService,
    private geocodingService: GeocodingService,
    private router: Router) { }

  ngOnInit() {
    this._id = this.kidsService.kidToEdit._id;
    this.name = this.kidsService.kidToEdit.name;
    this.gender = this.kidsService.kidToEdit.gender;
    this.age = this.kidsService.kidToEdit.age;
    this.address = this.kidsService.kidToEdit.address;
  }

  onEditKidSubmit(){
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
        if (data.status == "ZERO_RESULTS" || data.status == "OVER_QUERY_LIMIT" || data.status == "REQUEST_DENIED") {
          kid.lat = 0;
          kid.lng = 0;
        } else {
          kid.lat = data.results[0].geometry.location.lat;
          kid.lng = data.results[0].geometry.location.lng;
        }
        this.kidsService.editKid(kid).subscribe(data => {
          alert(data.msg);
          if(data.success){
            this.router.navigate(['/admin/kidslist']);
          } else {
            this.router.navigate(['/admin/addkid']);
          }
        });
      });
    }
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