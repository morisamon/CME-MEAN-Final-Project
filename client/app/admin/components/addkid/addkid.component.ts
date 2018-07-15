import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
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

  constructor(
    private kidsService: KidsService,
    private router: Router) { }

  ngOnInit() {      
    
  }

  onAddKidSubmit(){
    const kid = {
      _id: this._id,
      name: this.name,
      gender: this.gender,
      age: this.age,
      address: this.address
    }

    this.kidsService.addNewKid(kid).subscribe(data => {
      console.log(data.msg);
      if(data.success){
        this.router.navigate(['/admin/kidslist']);
      } else {
        this.router.navigate(['/admin/addkid']);
      }
    });
  }

}