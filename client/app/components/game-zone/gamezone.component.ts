import { Component, OnInit, NgModule, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Json } from '@angular/core/src/facade/lang';
import { DataService } from '../../services/DataService/data.service';



const SRC:String="/assets/videos/";

@Component({
  moduleId: module.id,
  selector: 'app-gamezone',
  templateUrl: './gamezone.component.html',
  styleUrls: ['./gamezone.component.css']
})


export class GameZoneAreaComponent implements OnInit, AfterViewInit{

  ngAfterViewInit(): void {
    //this.videoplayer.nativeElement.play(); //works!
  }
  @ViewChild('videoPlayer') videoplayer: any;
  
  public videoName: any;
  public hiddenImage: Boolean;
  public hiddenVideo: Boolean;
  public myFaceBtnStyles: Json;
  public myEyeBtnStyles: Json;
  public subLevel = 1;
  public videoSRC: String;
  public imageSRC: String;
  public level: String;
  public char: String

  
  constructor(private route: ActivatedRoute, private router:Router,private elementRef: ElementRef, private data: DataService) {
    this.route.params.subscribe((params) =>{
      this.videoName = params
      this.char = params.id.split('_')[0];
      this.level = params.id.split('_')[1].split('.')[0];
      this.videoSRC = this.getSrcToShow('.mp4');
      this.imageSRC = this.getSrcToShow('.png');
    });
    this.data.currentMessage.subscribe((message) => {
      this.ExecuteMessageCommand(message);
    });
    this.data.SetEnableNavButtons();
    this.ShowImage();
  }

  ngOnInit() {
  }

  getSrcToShow(type: String){
      var finalSRC = SRC + this.charType(this.videoName.id) + "/" + this.videoName.id + type;
      console.log(finalSRC);
      return finalSRC;
  }

  changeFaceBtnStyle(organ, left, top, width, height){
    if(organ == "face"){
      this.myFaceBtnStyles={'left':left,'top':top,'width':width,'height':height};
    }
    else if(organ == "eye"){
      this.myEyeBtnStyles={'left':left,'top':top,'width':width,'height':height};
    }
  }

  private charType(videoName){
    if(videoName.includes('player'))
      return "Player";
    if(videoName.includes('fireman'))
      return "Fireman";
    if(videoName.includes('superman'))
      return "Superman";
    if(videoName.includes('farmer'))
      return "Farmer";
    if(videoName.includes('superwoman'))
      return "Superwoman";
  }

  StartVideo(){
    this.ShowVideo();
    if(this.subLevel<=3){
      this.videoplayer.nativeElement.play();
    }
  }

  VideoEnded(){
    console.log("The video is stoped");
    this.subLevel++;
    if(this.subLevel<=3){
      this.ChangeSources();
      this.ShowImage();
    }

  }

  ShowImage(){
    this.hiddenImage = false;
    this.hiddenVideo = true;
  }

  ShowVideo(){
    this.hiddenImage = true;
    this.hiddenVideo = false;
  }

  ChangeSources(){
    this.imageSRC = SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.png';
    this.videoSRC = SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.mp4';
    this.videoplayer.nativeElement.src = this.videoSRC;
  }

  NextLevel(level){
    this.imageSRC = SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.png';
    this.videoSRC = SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.mp4';
    this.videoplayer.nativeElement.src = this.videoSRC;
  }

  ExecuteMessageCommand(command){
    switch(command){
      case "next":
      var newnumber = Number(this.level);
      newnumber++;
      if(newnumber<=3)
      {
        this.level = String(newnumber);
        this.subLevel = 1;
        this.ChangeSources();
      }
      break;
      case "prev":
      var newnumber = Number(this.level);
      newnumber--;
      if(newnumber>0)
      {
        this.level = String(newnumber);
        this.subLevel = 1;
        this.ChangeSources();
      }
      break;
      case "play":
      break;
      case "replay":
      break;
      case "stop":
      break;
    }
  }

}
