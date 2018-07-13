import { Component } from '@angular/core';
import { DataService } from '../../services/DataService/data.service';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-menu',
  templateUrl: 'nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [DataService]
})

export class NavComponent  {

  constructor(
    private data: DataService,
    private authService:AuthService,
    private router:Router
  ) {}

  onLogoutClick() {
    this.authService.logout();
    console.log("You are logged out");
    //this.flashMessage.show('You are logged out', {
    //  cssClass:'alert-success',
    //  timeout: 3000
    //});
    this.router.navigate(['/home/login']);
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
