import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';
import { TSMap } from "typescript-map"

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<string>("default message");
    currentMessage = this.messageSource.asObservable();

    private levelSource = new BehaviorSubject<string>("0");
    currentLevel = this.levelSource.asObservable();

    private buttonDisplayFlagSource = new BehaviorSubject<boolean>(true);
    currentButtonDisplayFlag = this.buttonDisplayFlagSource.asObservable();
    
    private currentComponent: String = "none";
    private currLevel;
    private gender: String;
    private kidid: Number;
    private gameStrated: Boolean = false;

    public start_time: Date;
    public end_time: Date;
    public videoDuration: Number = 0;
    public map = new TSMap<String,number>();

    constructor(private route: ActivatedRoute, private router:Router) {}

    changeMessage(message: string){
        this.executeCommand(message);
    }


    executeCommand(message){
        switch(message){
            case "stop":
            console.log("stop from nav to service");
            this.messageSource.next(message);
            break;

            case "play":
            console.log("play from nav to service");
            this.messageSource.next(message);
            break;

            case "replay":
            console.log("replay from nav to service");
            this.messageSource.next(message);
            break;

            case "char":
            console.log("char from nav to service");
            this.levelSource.next("getLevel");
            this.messageSource.next("char");
            break;

            case "prev":
            console.log("prev from nav to service");
            this.messageSource.next(message);
            break;

            case "next":
            console.log("next from nav to service");
            this.messageSource.next(message);
            break;

            case "home":
            console.log("home from nav to service");
            if(this.currentComponent == "none"){
                this.router.navigate(["/home"]);
            }
            else{
                this.messageSource.next(message);
            }
            break;

            default:
            console.log("Invalid message command arrived!");
            break;
        }
    }
    changeChar(level){
        console.log("change to char" + level);
    }
    SetLevel(level){
        this.currentLevel = level;
        this.levelSource.next(level);
    }

    HiddenNavButtons(flag){
        this.buttonDisplayFlagSource.next(flag);
    }

    CancelLastAction(){
        this.messageSource.next("default message");
    }

    SetGender(gender){
        this.gender = gender;
    }
    SetKidID(kidid){
        this.kidid = kidid;
    }
    StartAndStopSession(flag){
        this.gameStrated = flag;
    }
    SessionISStrated(): Boolean{
        return this.gameStrated;
    }
    SetStartTime(time){
        this.start_time = time;
    }
    GetKidID(): Number{
        return this.kidid;
    }
    GetGender(): String{
        if(this.gender == "Male"){
            return "boy";
        }
        else{
            return "girl";
        }
    }
    ResetSessionMetaData(){
        this.map.clear();
        this.videoDuration = 0;
        this.start_time = new Date();
    }
    UpdateCurrentComponent(component){
        this.currentComponent = component;
        if(component == "gameZone"){
            this.buttonDisplayFlagSource.next(false);
        }
        else{
            this.buttonDisplayFlagSource.next(true);
        }
    }


}