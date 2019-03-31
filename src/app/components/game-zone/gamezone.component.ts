import { Component, OnInit, OnDestroy, NgModule, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from '../../services/DataService/data.service';
import { GameSessionService } from '../../admin/services/gamesession.service';
import { SVM } from 'svm';
import { SvmVectorService } from '../../admin/services/svmvectors.service';
import { SvmVector } from '../../models/SvmVector';
import { ButtonStyle, LevelButtonStyle } from './button.style';
import { TSMap } from "typescript-map";
import { faceSTYLE, eyesSTYLE } from './variables';
import * as io from 'socket.io-client';
import { configAudioPerCharacter } from 'src/app/helper/audioCounter';
import { ExcelService } from 'src/app/services/ExcelService/excel.service';
import { configAlert } from 'src/app/helper/alert';

const VIDEO_SRC: string = "/assets/videos/";
const AUDIO_SRC: string = "/assets/voices/";

const BOY: string = "boy";
const GIRL: string = "girl";

const AUDIO_DEFAULT_BOY_START_SRC: String = "/assets/voices/general_boy_choose_start.wav";
const AUDIO_DEFAULT_GIRL_START_SRC: String = "/assets/voices/general_girl_choose_start.wav";

const AUDIO_DETECT_BOY_SRC: String = "/assets/voices/detect_boy.mp3";
const AUDIO_DETECT_GIRL_SRC: String = "/assets/voices/detect_girl.mp3";
const AUDIO_DETECT_GENERAL_DURATIONS: number = 7;

const stopPath: String = "/assets/stopAlert.png";
const eyesPath: String = "/assets/eyesAlert.png"

const TIMEOUT_BETWEEN_AUDIO_VOID: number = 1200;
const DELAY_FOR_SCREEN_BUTTONS = 5500;

@Component({
  selector: 'app-gamezone',
  templateUrl: './gamezone.component.html',
  styleUrls: ['./gamezone.component.css']
})

export class GameZoneAreaComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    //this.videoplayer.nativeElement.play(); //works!
  }

  @ViewChild('videoPlayer') videoplayer: any;
  @ViewChild('audioPlayer') audioplayer: any;
  @ViewChild('audioPlayerGeneral') audioplayerGeneral: any;

  public videoName: any;
  public hiddenImage: Boolean;
  public hiddenVideo: Boolean;
  public myFaceBtnStyles: JSON;
  public myEyeBtnStyles: JSON;
  public subLevel = 1;
  public videoSRC: String;
  public imageSRC: String;
  public audioSRC: String;
  public audioSRCGeneral: String;
  public level: String;
  public char: String
  public playManually: Boolean;
  public alertUrl: String;
  public ngIfAlert: Boolean = false;

  private startVoiceCount: number = 1;
  private gender: String;
  private kidid: Number;
  private sessionIfFinished: Boolean = false;
  private ngIfButtons: Boolean = true;
  private svm: SVM = new SVM();
  private vector: Number[][] = [[]];
  private dataSvmFromDB: SvmVector[];
  private dataSet: Number[][] = [[]];
  private labels: Number[] = [];
  private mapFace = new TSMap<String, ButtonStyle>();
  private mapEyes = new TSMap<String, ButtonStyle>();

  private timer : Date;

  private timeout;
  private socket;

  private excelDataList : any[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private elementRef: ElementRef, private data: DataService,
    private sessionService: GameSessionService,
    private svmVectorService: SvmVectorService,
    private excelService: ExcelService) {

    this.route.params.subscribe((params) => {
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
    var start = new Date();
    console.log(start);
    this.data.SetStartTime(start);
    this.InitStyles();
    this.SetFaceAndEyeButtonsStyle();
    this.socket = io();
    this.socket.emit('openAlgorithm');
  }

  SetFaceAndEyeButtonsStyle() {
    var stageKey = this.char + "_" + this.level + "_" + this.subLevel;

    var styleFace = this.mapFace.get(stageKey);
    var styleEyes = this.mapEyes.get(stageKey);

    if (styleFace == undefined || styleEyes == undefined) { return; }
    this.changeFaceBtnStyle("face", styleFace.left, styleFace.top, styleFace.width, styleFace.height);
    this.changeFaceBtnStyle("eyes", styleEyes.left, styleEyes.top, styleEyes.width, styleEyes.height);
  }

  mouseEnter(area) {
    this.timeout = setTimeout(() => {
      if (area === "eyes")
        this.StartVideo();
      else{
        this.Click(area);
        this.PlayDetectGeneralAudio();
      }
    }, 2000);
  }

  PlayDetectGeneralAudio(): any {
    var currentTime = new Date();
    if((currentTime.getTime() - this.timer.getTime())/1000.0 >= AUDIO_DETECT_GENERAL_DURATIONS){
      this.timer = new Date();
      if(this.gender == BOY)
        this.audioSRCGeneral = AUDIO_DETECT_BOY_SRC;
      
      else if(this.gender == GIRL)
        this.audioSRCGeneral = AUDIO_DETECT_GIRL_SRC;
      
      this.audioplayerGeneral.nativeElement.src = this.audioSRCGeneral;
      this.audioplayerGeneral.nativeElement.play();
    }
  }

  mouseLeave() {
    clearTimeout(this.timeout);
  }

  ngOnInit() {

    this.kidid = this.data.GetKidID();
    this.gender = this.data.GetGender();
    this.data.UpdateCurrentComponent("gameZone");
    this.PlayDefaultStartAudio();
  }

  ngOnDestroy() {
    this.data.UpdateCurrentComponent("none");
    this.socket.disconnect();
  }

  getSrcToShow(type: String) {
    var finalSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.videoName.id + type;
    console.log(finalSRC);
    return finalSRC;
  }

  changeFaceBtnStyle(organ, left, top, width, height) {
    if (organ == "face") {
      var btnStyle = new ButtonStyle();
      btnStyle.left = left;
      btnStyle.top = top;
      btnStyle.width = width;
      btnStyle.height = height;
      this.myFaceBtnStyles = JSON.parse(JSON.stringify(btnStyle));
    }
    else if (organ == "eyes") {
      var btnStyle = new ButtonStyle();
      btnStyle.left = left;
      btnStyle.top = top;
      btnStyle.width = width;
      btnStyle.height = height;
      this.myEyeBtnStyles = JSON.parse(JSON.stringify(btnStyle));
    }
  }

  private charType(videoName) {
    if (videoName.includes('player'))
      return "Player";
    if (videoName.includes('fireman'))
      return "Fireman";
    if (videoName.includes('superman'))
      return "Superman";
    if (videoName.includes('farmer'))
      return "Farmer";
    if (videoName.includes('superwoman'))
      return "Superwoman";
  }

  Click(area) {

    if (this.ngIfButtons == false || this.sessionIfFinished == true) {
      return;
    }

    var clickarea = this.GetArea(area);
    var count: number = this.data.map.get(clickarea);
    this.data.map.set(clickarea, count + 1);
  }

  private GetArea(area): string {
    return "area" + area;
  }

  StartVideo() {
    this.ShowVideo();
    this.Click("eyes");
    if (this.subLevel <= 3) {
      this.videoplayer.nativeElement.play();
      if (this.subLevel == 3 && this.char == "player") {
        this.CheckAlertPopupWindow();
        this.audioSRC = AUDIO_SRC + this.char + "/" + this.gender + "/" + this.char + "_" + this.gender + "_" + this.level + "_" + this.startVoiceCount + '.mp3';
        this.audioplayer.nativeElement.src = this.audioSRC;
        this.audioplayer.nativeElement.play();
        this.startVoiceCount++;
      }
    }
    if (this.subLevel <= 3) {
      this.videoplayer.nativeElement.play();
      if (this.subLevel != 4 && this.char != "player") {
        this.CheckAlertPopupWindow();
        this.audioSRC = AUDIO_SRC + this.char + "/" + this.gender + "/" + this.char + "_" + this.gender + "_" + this.level + "_" + this.startVoiceCount + '.mp3';
        this.audioplayer.nativeElement.src = this.audioSRC;
        this.audioplayer.nativeElement.play();
        this.startVoiceCount++;
      }
    }
    this.ngIfButtons = false;
  }

  private CheckAlertPopupWindow() {
    var audioRelevantFileName = this.char + "_" + this.gender + "_" + this.level + "_" + this.startVoiceCount + '.mp3';
    var isAlert = configAlert[audioRelevantFileName];
    if (isAlert) {
      if (isAlert == "stop")
        this.alertUrl = stopPath;
      else
        this.alertUrl = eyesPath;

      this.ngIfAlert = true;
    }
    else{
      this.ngIfAlert = false;
    }
  }

  PlayDefaultStartAudio() {
    if (this.level == "1" && this.subLevel == 1) {
      if (this.gender == BOY) {
        this.audioSRC = AUDIO_DEFAULT_BOY_START_SRC;
      }
      else if (this.gender == GIRL) {
        this.audioSRC = AUDIO_DEFAULT_GIRL_START_SRC;
      }

      this.audioplayer.nativeElement.src = this.audioSRC;
      this.audioplayer.nativeElement.play();
      this.ngIfButtons = false;
    }

  }

  VideoEnded(e, video) {
    console.log('duration video: ', video.duration);
    console.log("The video is stopped");

    this.subLevel++;
    if (this.subLevel <= 3) {
      if (this.playManually == false) {
        this.data.videoDuration += video.duration;
        this.ChangeSources();
        this.SetFaceAndEyeButtonsStyle();
      }
      this.ShowImage();
      this.playManually = false;
    }
    if (this.subLevel == 4) {
      this.sessionIfFinished = true;
      this.ngIfButtons = false;
      this.data.end_time = new Date();
      console.log(this.data.end_time);
      this.socket.emit("stopAlgorithm");
    }

    setTimeout(() => {
      this.subLevel != 4 ? this.ngIfButtons = true : "" ;
    }, DELAY_FOR_SCREEN_BUTTONS);
  }

  AudioEnded(e, audio) {
    console.log('duration video: ', audio.duration);
    console.log("Audio is ended now");
    
    if(this.char == "fireman" && this.level == "3" && this.subLevel == 3){
      setTimeout(() => {
        this.PlayNextAudioSet(audio);
      }, 4000);
    }
    else{
      this.PlayNextAudioSet(audio);
    }
  }

  private PlayNextAudioSet(audio: any) {
    var counter = configAudioPerCharacter[this.char + "_" + this.gender + "_" + this.level + "_" + this.subLevel];
    if (!counter) {
      counter = 3;
    }
    if (this.startVoiceCount <= counter) {
      this.data.videoDuration += audio.duration;
      setTimeout(() => {
        this.ChangeAudioSource();
      }, TIMEOUT_BETWEEN_AUDIO_VOID);
    }
    if (this.startVoiceCount > counter) {
      setTimeout(() => {
        this.subLevel != 4 ? this.ngIfButtons = true : "";
        this.ngIfAlert = false;
        this.timer = new Date();
      }, DELAY_FOR_SCREEN_BUTTONS);
    }
    else
      this.ngIfButtons = false;
  }

  ChangeAudioSource() {
    this.audioSRC = AUDIO_SRC + this.char + "/" + this.gender + "/" + this.char + "_" + this.gender + "_" + this.level + "_" + this.startVoiceCount + '.mp3';
    this.audioplayer.nativeElement.src = this.audioSRC;

    var playPromise = this.audioplayer.nativeElement.play();
    this.CheckAlertPopupWindow();
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        this.ngIfButtons = false;
        this.startVoiceCount++;
      })
        .catch(error => {
          console.log(error);
          setTimeout(() => {
            this.subLevel != 4 ? this.ngIfButtons = true : "";
          }, DELAY_FOR_SCREEN_BUTTONS);
          if(this.char == "farmer" && this.level == "2" && this.startVoiceCount == 11){
            this.audioSRC = "/assets/voices/farmer/boy/farmer_boy_3_10.mp3"; //lo nitbalbel
            this.audioplayer.nativeElement.src = this.audioSRC;
            this.audioplayer.nativeElement.play();
          }
          this.startVoiceCount++;
        });
    }

    /*this.audioplayer.nativeElement.play();
    this.ngIfButtons = false;
    this.startVoiceCount++;*/
  }

  ShowImage() {
    this.hiddenImage = false;
    this.hiddenVideo = true;
  }

  ShowVideo() {
    this.hiddenImage = true;
    this.hiddenVideo = false;
  }

  ChangeSources() {
    this.imageSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.png';
    this.videoSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.mp4';
    if (this.videoplayer != undefined) {
      this.videoplayer.nativeElement.src = this.videoSRC;
    }
    else {
      console.log("videoplayer is undefined!!!!")
    }

  }

  NextLevel(level) {
    this.imageSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.png';
    this.videoSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.mp4';
    if (this.videoplayer != undefined) {
      this.videoplayer.nativeElement.src = this.videoSRC;
    }
    else {
      console.log("videoplayer is undefined!!!!")
    }
  }

  ExecuteMessageCommand(command) {
    switch (command) {
      case "next":

        var newnumber = Number(this.level);
        newnumber++;

        if (newnumber <= 3) {
          this.WriteAndResetSession();
          this.level = String(newnumber);
          this.subLevel = 1;
          this.data.start_time = new Date();
          this.startVoiceCount = 1;
          this.StopMedia();
          this.ChangeAudioSource();
          this.ChangeSources();
          this.SetFaceAndEyeButtonsStyle();
          this.PlayDefaultStartAudio();
          this.ShowImage();
          this.socket.emit('openAlgorithm');
        }
        this.data.CancelLastAction();
        break;

      case "prev":
        var newnumber = Number(this.level);
        newnumber--;
        if (newnumber > 0) {
          this.WriteAndResetSession();
          this.level = String(newnumber);
          this.subLevel = 1;
          this.data.start_time = new Date();
          this.startVoiceCount = 1;
          this.StopMedia();
          this.ChangeAudioSource();
          this.ChangeSources();
          this.SetFaceAndEyeButtonsStyle();
          this.PlayDefaultStartAudio();
          this.ShowImage();
          this.socket.emit('openAlgorithm');
        }
        this.data.CancelLastAction();
        break;

      case "play":
        this.playManually = true;
        this.ShowVideo();
        this.videoplayer.nativeElement.play();
        this.ngIfButtons = false;
        this.data.CancelLastAction();
        break;

      case "replay":
        this.audioplayer.nativeElement.play();
        this.ngIfButtons = false;
        this.data.CancelLastAction();
        break;

      case "stop":
        this.WriteAndResetSession();
        this.data.CancelLastAction();
        this.router.navigate(["/home"]);
        break;

      case "char":
        this.WriteAndResetSession();
        this.data.CancelLastAction();
        this.router.navigate(['/home/levels/characters', this.data.currentLevel]);
        break;

      case "home":
        this.WriteAndResetSession();
        this.data.CancelLastAction();
        this.router.navigate(["/home"]);
        break;
    }
  }

  WriteAndResetSession() {
    if (this.sessionIfFinished == false) {
      return;
    }

    this.sessionIfFinished = false;
    const session = {
      kidid: Number(this.data.GetKidID()),
      character: this.char,
      level: this.level,
      total_time: (this.data.end_time.getTime() - this.data.start_time.getTime()) / 1000.0,
      video_duration: this.data.videoDuration,
      areas: this.data.map.toJSON()
    }

    //for test the excel
    const data = {
      kidid: Number(this.data.GetKidID()),
      character: this.char,
      level: this.level,
      total_time: (this.data.end_time.getTime() - this.data.start_time.getTime()) / 1000.0,
      video_duration: this.data.videoDuration,
    }

    //predict the kid permormance

    //new vector
    this.vector = [this.BuildVector(session.total_time, session.video_duration)];

    //get all dataset
    this.svmVectorService.getDataSet().subscribe(data => {

      this.dataSvmFromDB = data;
      this.InitDataSetToVector(this.dataSvmFromDB);
      //train
      this.svm.train(this.dataSet, this.labels, { C: 1.0 });
      //classifier
      var testlabel = this.svm.predict(this.vector);
      //alert("SVM Classifier: " + testlabel);
      console.log("SVM Classifier: " + testlabel);

      var svmVector = this.svmVectorService.ConvertVectorToObject(this.vector[0], testlabel[0]);
      this.svmVectorService.addNewVector(svmVector).subscribe(data => {
        console.log(data.msg);
        if (data.success) {
          console.log("svm vector inserted to mongo");
        } else {
          alert("Error while writting the svm vector to mongo db");
        }
      });
    });

    //write current session to mongo db
    console.log(session);
    this.sessionService.addNewSessionForKid(session).subscribe(data => {
      console.log(data.msg);
      if (data.success) {
        console.log("session inserted to mongo");
      } else {
        alert("Error while writting the session to mongo db");
      }
      this.data.ResetSessionMetaData();
    });

    try {
      this.BuildExcelFileData();
      this.exportAsXLSX(this.excelDataList);
    }
    catch (e) {
      console.log("Error while exporting excel file!" + " " + e);
    }
  }

  private BuildExcelFileData() {
    var charLevel = this.char + " " + this.level;
    var details = this.vector[0];
    this.excelDataList.push({
      area: charLevel + " " + "area " + "eyes",
      countWatch: details[3],
      picture: "",
      timeWatch: Math.round((Number(details[3]) * 2)*100)/100,
      percentageWatch: Math.round(((Number(details[3]) * 2 / Number(details[0]))*100)*100)/100 + "%"
    }, {
        area: charLevel + " " + "area " + "face",
        countWatch: details[4],
        picture: "",
        timeWatch: Math.round((Number(details[4]) * 2)*100)/100,
        percentageWatch: Math.round(((Number(details[4]) * 2 / Number(details[0]))*100)*100)/100 + "%"
      });
    var j = 5;
    for (var i = 1; i <= 6; i++) {
      this.excelDataList.push(this.excelBuilderHelper(charLevel, i, details[j], details[0]));
      j++;
    }
    this.excelDataList.push({
        area: "vagrancy time",
        countWatch: "-",
        picture: "-",
        timeWatch: Math.round((Number(details[2]))*100)/100,
        percentageWatch: Math.round(((Number(details[2])/Number(details[0]))*100)*100)/100 + "%"
      },
      {
        area: "video time",
        countWatch: "-",
        picture: "-",
        timeWatch: Math.round((Number(details[1]))*100)/100,
        percentageWatch: Math.round(((Number(details[1])/Number(details[0]))*100)*100)/100 + "%"
      },
      {
        totalTime : Math.round((Number(details[0]))*100)/100
      }
    )
  }

  excelBuilderHelper(charLevel, name, count, total): any{
    return{
      area : charLevel + " " + "area " + name,
      countWatch : count,
      picture : "",
      timeWatch : Math.round((Number(count)*2)*100)/100,
      percentageWatch : Math.round(((Number(count)*2 / Number(total))*100)*100)/100 + "%"
    }
  }

  exportAsXLSX(data): void {
    this.excelService.exportAsExcelFile(data, this.kidid + "_" + this.char + "_" + this.level);
  }

  StopMedia() {
    this.videoplayer.nativeElement.pause();
    this.audioplayer.nativeElement.pause();
  }

  BuildVector(total_time, video_duration): Number[] {
    var sumAreas = 0;

    var area1 = this.data.map.get("area1");
    var area2 = this.data.map.get("area2");
    var area3 = this.data.map.get("area3");
    var area4 = this.data.map.get("area4");
    var area5 = this.data.map.get("area5");
    var area6 = this.data.map.get("area6");
    var areaface = this.data.map.get("areaface");
    var areaeyes = this.data.map.get("areaeyes");
    sumAreas = area1 + area2 + area3 + area4 + area5 + area6 + areaface + areaeyes;

    var vagrancy_time = total_time - video_duration - (sumAreas * 2);

    return [total_time, video_duration, vagrancy_time, areaeyes, areaface,
      area1, area2, area3, area4, area5, area6];
  }

  private InitDataSetToVector(dataSvmFromDB) {
    for (var i = 0; i < dataSvmFromDB.length; i++) {
      var x = dataSvmFromDB[i];
      this.dataSet[i] = [x.total_time, x.video_duration, x.vagrancy_time, x.area1, x.area2, x.area3, x.area4, x.area5, x.area6, x.areaface, x.areaeyes];
      this.labels[i] = x.label;
    }
  }

  InitStyles() {
    faceSTYLE.forEach(x => {
      this.mapFace.set(x.name, x.style);
    });

    eyesSTYLE.forEach(y => {
      this.mapEyes.set(y.name, y.style);
    });
  }

}