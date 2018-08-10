import { Component, OnInit } from "@angular/core";
import { KidsService } from "../../services/kids.service";
import { Router } from "@angular/router";
import { Kid } from "../../Kid";
const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
@Component({
  selector: "app-kids-list",
  templateUrl: "./kids-list.component.html",
  styleUrls: ["./kids-list.component.css"]
})
export class KidsListComponent {
  private _kids: Kid[] = [];
  get kids(): Kid[] {
    return this._kids;
  }
  set kids(kids: Kid[]) {
    this._kids = kids;
    const address = {};
    const age = [0, 0, 0];
    const gender = [0, 0, 0];

    this._kids.forEach(
      kid =>
        typeof address[kid.address as any] === 'undefined'
          ? (address[kid.address as any] = 1)
          : address[kid.address as any]++
    );
    this.kids.forEach(function(kid) {
      if (kid.gender.toLocaleLowerCase() === "male") {
        gender[0]++;
      } else if (kid.gender.toLocaleLowerCase() === "female"){
        gender[1]++;
      } else {
        gender[2]++;
      }

      if (kid.age <= 4) {
        age[0]++;
      } else if (kid.age <= 8) {
        age[1]++;
      } else {
        age[2]++;
      }
    });

    this.pieChartData = [{
      id: 0,
      label: 'under 4',
      value: age[0],
      color: 'blue',
    }, {
      id: 1,
      label: 'between 4-8',
      value: age[1],
      color: 'black',
    }, {
      id: 2,
      label: 'over 8 ',
      value: age[2],
      color: 'red',
    }];

    this.pieChartGenderData = [{
      id: 0,
      label: 'male',
      value: gender[0],
      color: 'yellow',
    }, {
      id: 1,
      label: 'female',
      value: gender[1],
      color: 'green',
    }, {
      id: 2,
      label: 'unknown ',
      value: gender[2],
      color: 'purple',
    }];

    const sumAddress = Object.keys(address).reduce((a, b) => a + address[b], 0);
    const sumAge = Object.keys(age).reduce((a, b) => a + age[b], 0);

    this.chartDataAddress = Object.keys(address).map((label, id) => ({
      id,
      // @ts-ignore
      label: `${label} ${((address[label] / sumAddress)*100).toFixed(1)}%` ,
      value: address[label],
      color: colorArray[id]
    }));
  }
  ageFilter: Number;
  genderFilter: String;
  nameFilter: String;
  numOfKids: Number;
  public chartDataAddress;
  public pieChartData;
  public pieChartGenderData;


  constructor(private kidsService: KidsService, private router: Router) {}

  ngOnInit() {
    this.refreshList();
  }

  onFilter() {
    this.kidsService
      .getKidsWithFilter(this.ageFilter, this.genderFilter, this.nameFilter)
      .subscribe(kids => {
        this.kids = kids;
      });
  }

  onAddKid() {
    this.router.navigate(["/admin/addkid"]);
  }

  onMap() {
    this.router.navigate(['/admin/map']);
  }

  deleteKid(id) {
    var kids = this.kids;

    this.kidsService.deleteKid(id).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < kids.length; i++) {
          if (kids[i]._id == id) {
            kids.splice(i, 1);
          }
        }
      }
    });
    this.refreshList();
  }

  editKid(kid) {
    this.kidsService.kidToEdit = kid;
    this.router.navigate(["/admin/editkid/", kid._id]);
  }

  kidGameSessions(kid) {
    this.kidsService.kidToShowSessions = kid;
    this.router.navigate(["/admin/kidsessions/", kid._id]);
  }

  refreshList() {
    this.kidsService.getKids().subscribe(kids => {
      this.kids = kids;
    });
    this.kidsService.getKidsCountGroupBy().subscribe(result => {
      this.numOfKids = result;
    });
  }
}
