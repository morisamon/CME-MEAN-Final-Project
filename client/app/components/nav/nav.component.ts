import { Component } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'my-menu',
  templateUrl: 'nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent  {

  public StopBtnClicked(){
    console.log("StopBtnClicked");
  }
  public PlayBtnClicked(){
    console.log("PlayBtnClicked");

  }
  public ReplayBtnClicked(){
    console.log("ReplayBtnClicked");

  }
  public ChangeCharacterBtnClicked(){
    console.log("ChangeCharacterBtnClicked");

  }
  public PrevBtnClicked(){
    console.log("PrevBtnClicked");

  }
  public NextBtnClicked(){
    console.log("NextBtnClicked");

  }
  public HomeBtnClicked(){
    console.log("HomeBtnClicked");

  }

}
