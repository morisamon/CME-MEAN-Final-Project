import { Component, OnInit, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
    selector: 'training',
    templateUrl: 'training.component.html',
    styleUrls: ['./training.component.css']
})

export class TrainingComponent implements OnInit {

    position: string;

    private id;
    public counter = 0;
    private top1: number = 0;
    private left: number = 0;
    private timeout;
    private socket;

    public imageSrc = "/assets/videos/else/plane1.png"
    public audioSrc = "/assets/videos/else/airplane.mp3";

    public ngIfButton: boolean = true;

    ngOnInit(): void {
        this.socket = io();
        this.socket.emit('openAlgorithm');
    }

    @ViewChild('myanimation') elem: any;
    @ViewChild('airplanevoice') airplaneVoice: any;
    @ViewChild('airplanebutton') airplaneButton: any;

    public frame = () => {
        switch (this.counter) {
            case 0:
                this.top1 = this.top1 + 0.85;
                this.left = this.left + 0.7;
                this.elem.nativeElement.style.top = this.top1 + 'px';
                this.elem.nativeElement.style.left = this.left + 'px';
                break;
            case 1:
                this.top1 = this.top1 - 0.8;
                this.left = this.left + 0.7;
                this.elem.nativeElement.style.top = this.top1 + 'px';
                this.elem.nativeElement.style.left = this.left + 'px';
                break;
            case 2:
                this.top1 = this.top1 + 0.8;
                this.left++;
                this.elem.nativeElement.style.top = this.top1 + 'px';
                this.elem.nativeElement.style.left = this.left + 'px';
                break;
        }
    }

    mouseEnter() {
        this.timeout = setTimeout(() => {
            this.myMove();
        }, 2000)
    };

    mouseLeave() {
        clearTimeout(this.timeout);
    }

    myMove() {
        this.ngIfButton = false;
        this.airplaneVoice.nativeElement.play()
        this.id = setInterval(this.frame, 10)
        setTimeout(() => {
            this.myFunc();
        }, 4700);
    }

    myFunc() {
        this.ngIfButton = true;
        this.counter++;
        clearInterval(this.id);
        if(this.counter >= 3){
            this.socket.emit("stopAlgorithm");
        }
    }
}