import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../../services/DataService/data.service';
import { AuthService } from '../../authentication/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-menu',
  templateUrl: 'nav.component.html',
  styleUrls: ['./nav.component.css']
})
    
export class NavComponent  implements OnInit {

  flag: boolean;

  constructor(
    private data: DataService,
    private authService: AuthService,
    private router:Router
  ) {}

  ngOnInit(){
    this.data.currentButtonDisplayFlag.subscribe((flag) => {
      this.flag=flag;
    });
  }

  onLogoutClick() {
    this.authService.logout();
    console.log("You are logged out");
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