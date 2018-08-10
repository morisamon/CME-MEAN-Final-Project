import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { DataService } from '../../services/DataService/data.service';
import { AuthService } from '../../authentication/services/authService/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-menu',
  templateUrl: 'nav.component.html',
  styleUrls: ['./nav.component.css']
})
    

export class NavComponent  implements OnInit {

  flag: boolean;
  currentComponent: string;
  city: string;
  cities: String[];

  @ViewChild('myCanvas') myCanvas: any;

  constructor(
    private data: DataService,
    private authService: AuthService,
    private router:Router,
    private http: HttpClient) {
      this.cities = [
        "Jerusalem",
        "Haifa",
        "Eilat",
        "Tel Aviv",
        "Beer Sheva",
        "Kfar Saba",
        "Netanya",
        ];
    }

  ngOnInit() {
    this.data.currentButtonDisplayFlag.subscribe((flag) => {
      this.flag=flag;
      console.log("nav component: Activation of gameZone component is: " + this.flag);
    });
    var ctx = this.myCanvas.nativeElement.getContext("2d");
    ctx.font = "30px Tahoma";
    ctx.strokeStyle="#0000b3";
    ctx.strokeText("CMe", 5, 27);
  }

  getTemp() {
    if (this.city != undefined) {
      var string = 'https://api.openweathermap.org/data/2.5/weather?q='+ this.city +'&appid=5372c70cd09242d80449ec961e370962';
      this.http.get(string).subscribe(data => {
        var json = JSON.parse(JSON.stringify(data));
        var message = "The tempeture in " + this.city + " is " + (Math.round((json.main.temp-273.15)*100)/100) + " celsius";
        alert(message);
      });
    } else alert("Please choose city");
  }

  onLogoutClick() {
    this.authService.logout();
    alert("You are logged out");
    this.router.navigate(['/home/login']);
    return false;
  }

  isHidden() {
    if (this.flag == true)
      return true;
    else
      return false; 
  }

  public StopBtnClicked(){
    this.data.changeMessage("stop");
  }
  public PlayBtnClicked(){
    this.data.changeMessage("play");
  }
  public ReplayBtnClicked(){
    this.data.changeMessage("replay");
  }
  public ChangeCharacterBtnClicked(){
    this.data.changeMessage("char");
  }
  public PrevBtnClicked(){
    this.data.changeMessage("prev");
  }
  public NextBtnClicked(){
    this.data.changeMessage("next");
  }
  public HomeBtnClicked(){
    this.data.changeMessage("home");
  }

}