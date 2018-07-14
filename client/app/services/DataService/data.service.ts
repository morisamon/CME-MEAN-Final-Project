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
    SetEnableNavButtons(){

    }
}