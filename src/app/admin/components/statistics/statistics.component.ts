import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Kid } from "../../Kid";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {

  pieChartGenderData: any;
  donutChartAgeData: any;
  kids: Kid[];

  constructor(private kidsService: KidsService) { }

  ngOnInit() {
    this.kidsService.getKids().subscribe(kids => {
      this.kids = kids;
      const age = [0, 0, 0];
      const gender = [0, 0];
  
      this.kids.forEach(function(kid) {
        if (kid.gender === "Male") {
          gender[0]++;
        } else if (kid.gender === "Female"){
          gender[1]++;
        }
  
        if (kid.age < 5) {
          age[0]++;
        } else if (kid.age <= 9) {
          age[1]++;
        } else {
          age[2]++;
        }
      });
  
      this.donutChartAgeData = [{
        id: 0,
        label: 'Under 5',
        value: age[0],
        color: '#ea8d18',
      }, {
        id: 1,
        label: 'Between 5-9',
        value: age[1],
        color: '#d85657',
      }, {
        id: 2,
        label: 'Over 9',
        value: age[2],
        color: '#5479a9',
      }];
  
      this.pieChartGenderData = [{
        id: 0,
        label: 'Male',
        value: gender[0],
        color: '#FFFF99',
      }, {
        id: 1,
        label: 'Female',
        value: gender[1],
        color: '#FF33FF',
      }];

    });
  }

  /*public centerImageEvent() {
  }*/

}
