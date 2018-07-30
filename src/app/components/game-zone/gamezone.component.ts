import { Component, OnInit, NgModule, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from '../../services/DataService/data.service';

const VIDEO_SRC: string="/assets/videos/";
const AUDIO_SRC: string="/assets/voices/";

const BOY: string = "boy";
const GIRL: string = "girl";

const AUDIO_DEFAULT_BOY_START_SRC:String = "/assets/voices/general_boy_choose_start.wav";
const AUDIO_DEFAULT_GIRL_START_SRC:String = "/assets/voices/general_girl_choose_start.wma";

const TIMEOUT_BETWEEN_AUDIO_VOID: number = 1200;

@Component({
  selector: 'app-gamezone',
  templateUrl: './gamezone.component.html',
  styleUrls: ['./gamezone.component.css']
})


export class GameZoneAreaComponent implements OnInit, AfterViewInit{

  ngAfterViewInit(): void {
    //this.videoplayer.nativeElement.play(); //works!
  }

  @ViewChild('videoPlayer') videoplayer: any;
  @ViewChild('audioPlayer') audioplayer: any;

  public videoName: any;
  public hiddenImage: Boolean;
  public hiddenVideo: Boolean;
  public myFaceBtnStyles: JSON;
  public myEyeBtnStyles: JSON;
  public subLevel = 1;
  public videoSRC: String;
  public imageSRC: String;
  public audioSRC: String;
  public level: String;
  public char: String
  public playManually: Boolean;
  public map = new Map<string, number>();

  private startVoiceCount: number = 1;
  private gender: String = "boy";
  
  constructor(private route: ActivatedRoute, private router:Router,private elementRef: ElementRef, private data: DataService) {
    this.route.params.subscribe((params) =>{
      this.videoName = params
      this.char = params.id.split('_')[0];
      this.level = params.id.split('_')[1].split('.')[0];
      this.subLevel = 1;
      this.videoSRC = this.getSrcToShow('.mp4');
      this.imageSRC = this.getSrcToShow('.png');
    });
    this.data.currentMessage.subscribe((message) => {
      this.ExecuteMessageCommand(message);
    });
    this.data.HiddenNavButtons(false);
    this.ShowImage();
  }

  ngOnInit() {
    this.PlayDefaultStartAudio();
  }

  getSrcToShow(type: String){
      var finalSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.videoName.id + type;
      console.log(finalSRC);
      return finalSRC;
  }

  changeFaceBtnStyle(organ, left, top, width, height){
    if(organ == "face"){
      //this.myFaceBtnStyles={'left':left,'top':top,'width':width,'height':height};
    }
    else if(organ == "eye"){
      //this.myEyeBtnStyles={'left':left,'top':top,'width':width,'height':height};
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

  Click(area){
    var clickarea = this.GetArea(area);
    if(!this.map.has(area)){
      this.map.set(area,1);
    }
    else{
      var count = this.map.get(area);
      this.map.set(area,count+1);
    }
    console.log(area);
    console.log(count);
  }

  private GetArea(area) : String{
    return this.char +" "+ this.level + "area" + " " + area;
  }

  StartVideo(){
    this.ShowVideo();
    this.Click("eye");
    if(this.subLevel<=3){
      this.videoplayer.nativeElement.play();
      if(this.subLevel==3){
        this.audioSRC = AUDIO_SRC + this.char + "_" + this.gender + "_" + this.level + "_" + this.startVoiceCount + '.wav';
        this.audioplayer.nativeElement.src = this.audioSRC;
        this.audioplayer.nativeElement.play();
      }
    }
  }

  PlayDefaultStartAudio(){
    if(this.level == "1" && this.subLevel == 1){
      if(this.gender == BOY){
        this.audioSRC = AUDIO_DEFAULT_BOY_START_SRC;
      }
      else if (this.gender == GIRL){
        this.audioSRC = AUDIO_DEFAULT_GIRL_START_SRC;
      }
    
      this.audioplayer.src = this.audioSRC;
      this.audioplayer.nativeElement.play();
    }

  }

  VideoEnded(){
    console.log("The video is stoped");
    this.subLevel++;
    if(this.subLevel<=3){
      if(this.playManually==false){
        this.ChangeSources();
      }
      this.ShowImage();
      this.playManually = false;
    }

  }

  AudioEnded(){
    console.log("Audio is ended now");
    if(this.startVoiceCount <= 3){
      setTimeout(() => {
        this.audioSRC = AUDIO_SRC + this.char + "_" + this.gender + "_" + this.level + "_" + this.startVoiceCount + '.wav';
        this.audioplayer.nativeElement.src = this.audioSRC;
        this.audioplayer.nativeElement.play();
        this.startVoiceCount++;
      }, TIMEOUT_BETWEEN_AUDIO_VOID);

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
    this.imageSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.png';
    this.videoSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.mp4';
    if(this.videoplayer != undefined){
      this.videoplayer.nativeElement.src = this.videoSRC;
    }
    else{
      console.log("videoplayer is undefined!!!!")
    }
      
  }

  NextLevel(level){
    this.imageSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.png';
    this.videoSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.mp4';
    if(this.videoplayer != undefined){
      this.videoplayer.nativeElement.src = this.videoSRC;
    }
    else{
      console.log("videoplayer is undefined!!!!")
    }
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
      this.PlayDefaultStartAudio();
      this.data.CancelLastAction();
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
      this.PlayDefaultStartAudio();
      this.data.CancelLastAction();
      break;
      case "play":
      this.playManually = true;
      this.ShowVideo();
      this.videoplayer.nativeElement.play();
      this.data.CancelLastAction();
      break;
      case "replay":
      this.audioplayer.nativeElement.play();
      this.data.CancelLastAction();
      break;
      case "stop":
      //write all click to mongo, clear temp memory and navigate
      this.router.navigate(['home']);
      this.data.CancelLastAction();
      break;
    }
  }
}
