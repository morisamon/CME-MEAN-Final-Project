import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Router } from '@angular/router';

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

  constructor(
    private kidsService: KidsService,
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
      address: this.address
    }

    this.kidsService.editKid(kid).subscribe(data => {
      console.log(data.msg);
      if(data.success){
        this.router.navigate(['/admin/kidslist']);
      } else {
        this.router.navigate(['/admin/editKid/' + this._id]);
      }
    });
  }

}