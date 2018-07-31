import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<string>("default message");
    currentMessage = this.messageSource.asObservable();

    private levelSource = new BehaviorSubject<string>("0");
    currentLevel = this.levelSource.asObservable();

    private buttonDisplayFlagSource = new BehaviorSubject<boolean>(false);
    currentButtonDisplayFlag = this.buttonDisplayFlagSource.asObservable();

    private currLevel;
    private gender: String;
    private kidid: Number;
    private gameStrated: Boolean = false;
    public start_time: Date;
    public videoDuration: Number = 0;

    public map = new Map<string, number>();

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
            this.router.navigate(['/home/levels/characters', this.currentLevel]);
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
            this.router.navigate(['/home']);
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


}