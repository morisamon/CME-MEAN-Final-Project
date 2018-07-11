import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Json } from '@angular/core/src/facade/lang';

const SRC:String="/assets/vidoes/";


@Component({
  moduleId: module.id,
  selector: 'app-gamezone',
  templateUrl: './gamezone.component.html',
  styleUrls: ['./gamezone.component.css']
})


export class GameZoneAreaComponent implements OnInit {

  public videoName: any;
  public showImage: Boolean;
  public showVidoe: Boolean;
  public myFaceBtnStyles: Json;
  public myEyeBtnStyles: Json;

  constructor(private route: ActivatedRoute, private router:Router) {
    this.route.params.subscribe(params => this.videoName = params);
    this.showImage = true;
    this.showVidoe = false;
  }

  ngOnInit() {
  }

  getVideoToShow(src: String){
      console.log(SRC+this.videoName.id);
  }

  changeFaceBtnStyle(organ, left, top, width, height){
    if(organ == "face"){
      this.myFaceBtnStyles={'left':left,'top':top,'width':width,'height':height};
    }
    else if(organ == "eye"){
      this.myEyeBtnStyles={'left':left,'top':top,'width':width,'height':height};
    }
  }

}
