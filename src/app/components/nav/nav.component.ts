import { Component, OnInit, NgModule } from '@angular/core';
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
  messageToShare: String;
  city: string;
  cities: String[];

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

  ngOnInit(){
    this.data.currentButtonDisplayFlag.subscribe((flag) => {
      this.flag=flag;
      console.log("nav component: Activation of gameZone component is: " + this.flag);
      this.messageToShare = "Try to play in CME now!!!";
    });

  }

  getTemp() {
    var string = 'https://api.openweathermap.org/data/2.5/weather?q='+ this.city +'&appid=5372c70cd09242d80449ec961e370962';
    this.http.get(string).subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      var message = "The tempeture in " + this.city + " is " + (json.main.temp-273.15) + "celsius";
      alert(message);
    });
  }

  onLogoutClick() {
    this.authService.logout();
    console.log("You are logged out");
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