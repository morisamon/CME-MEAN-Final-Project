import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../admin/services/kids.service';
import { Kid } from '../../admin/Kid';
import { Router } from '../../../../node_modules/@angular/router';
import { DataService } from '../../services/DataService/data.service';

@Component({
  selector: 'app-choosekid',
  templateUrl: './choosekid.component.html',
  styleUrls: ['./choosekid.component.css']
})
export class ChoosekidComponent implements OnInit {

  kids: Kid[];
  kidChosen: Number;
  genderChosen: String;

  constructor(
    private kidsService: KidsService,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.kidsService.getKids()
    .subscribe(kids => {
        this.kids = kids;
    });
  }
  
  onStart() {
    this.kids.forEach(element => {
      if (element._id = this.kidChosen) {
        this.genderChosen = element.gender;
      }
    });
    this.dataService.SetKidID(this.kidChosen);
    this.dataService.SetGender(this.genderChosen);
    this.router.navigate(['/home/levels']);
  }

}
