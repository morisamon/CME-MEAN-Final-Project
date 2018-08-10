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
  messageToShare: String;

  constructor(
    private kidsService: KidsService,
    private router: Router,
    private dataService: DataService,
    ) {
    this.kidChosen = 0;
    this.messageToShare = "Try to play in CME now!!!";
  }

  ngOnInit() {
    this.kidsService.getKids()
    .subscribe(kids => {
        this.kids = kids;
    });
  }
  
  onStart() {
    if (this.kidChosen != 0) {
      this.kids.forEach(element => {
        if (element._id == this.kidChosen) {
          this.genderChosen = element.gender;
        }
      });
      this.dataService.SetKidID(this.kidChosen);
      this.dataService.SetGender(this.genderChosen);
      this.router.navigate(['/home/levels']);
    } else alert("Please choose kid");
  }


}
