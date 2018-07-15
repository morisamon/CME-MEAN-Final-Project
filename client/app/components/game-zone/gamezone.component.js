"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../../services/DataService/data.service");
var VIDEO_SRC = "/assets/videos/";
var AUDIO_SRC = "/assets/voices/";
var BOY = "boy";
var GIRL = "girl";
var AUDIO_DEFAULT_BOY_START_SRC = "/assets/voices/general_boy_choose_start.wav";
var AUDIO_DEFAULT_GIRL_START_SRC = "/assets/voices/general_girl_choose_start.wma";
var TIMEOUT_BETWEEN_AUDIO_VOID = 1200;
var GameZoneAreaComponent = /** @class */ (function () {
    function GameZoneAreaComponent(route, router, elementRef, data) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.elementRef = elementRef;
        this.data = data;
        this.subLevel = 1;
        this.startVoiceCount = 1;
        this.gender = "girl";
        this.route.params.subscribe(function (params) {
            _this.videoName = params;
            _this.char = params.id.split('_')[0];
            _this.level = params.id.split('_')[1].split('.')[0];
            _this.subLevel = 1;
            _this.videoSRC = _this.getSrcToShow('.mp4');
            _this.imageSRC = _this.getSrcToShow('.png');
        });
        this.data.currentMessage.subscribe(function (message) {
            _this.ExecuteMessageCommand(message);
        });
        this.data.HiddenNavButtons(false);
        this.ShowImage();
    }
    GameZoneAreaComponent.prototype.ngAfterViewInit = function () {
        //this.videoplayer.nativeElement.play(); //works!
    };
    GameZoneAreaComponent.prototype.ngOnInit = function () {
        this.PlayDefaultStartAudio();
    };
    GameZoneAreaComponent.prototype.getSrcToShow = function (type) {
        var finalSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.videoName.id + type;
        console.log(finalSRC);
        return finalSRC;
    };
    GameZoneAreaComponent.prototype.changeFaceBtnStyle = function (organ, left, top, width, height) {
        if (organ == "face") {
            this.myFaceBtnStyles = { 'left': left, 'top': top, 'width': width, 'height': height };
        }
        else if (organ == "eye") {
            this.myEyeBtnStyles = { 'left': left, 'top': top, 'width': width, 'height': height };
        }
    };
    GameZoneAreaComponent.prototype.charType = function (videoName) {
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
    };
    GameZoneAreaComponent.prototype.StartVideo = function () {
        this.ShowVideo();
        if (this.subLevel <= 3) {
            this.videoplayer.nativeElement.play();
            if (this.subLevel == 3) {
                this.audioSRC = AUDIO_SRC + this.char + "_" + this.gender + "_" + this.level + "_" + this.startVoiceCount + '.wav';
                this.audioplayer.nativeElement.src = this.audioSRC;
                this.audioplayer.nativeElement.play();
            }
        }
    };
    GameZoneAreaComponent.prototype.PlayDefaultStartAudio = function () {
        if (this.level == "1" && this.subLevel == 1) {
            if (this.gender == BOY) {
                this.audioSRC = AUDIO_DEFAULT_BOY_START_SRC;
            }
            else if (this.gender == GIRL) {
                this.audioSRC = AUDIO_DEFAULT_GIRL_START_SRC;
            }
            this.audioplayer.src = this.audioSRC;
            this.audioplayer.nativeElement.play();
        }
    };
    GameZoneAreaComponent.prototype.VideoEnded = function () {
        console.log("The video is stoped");
        this.subLevel++;
        if (this.subLevel <= 3) {
            if (this.playManually == false) {
                this.ChangeSources();
            }
            this.ShowImage();
            this.playManually = false;
        }
    };
    GameZoneAreaComponent.prototype.AudioEnded = function () {
        var _this = this;
        console.log("Audio is ended now");
        if (this.startVoiceCount <= 3) {
            setTimeout(function () {
                _this.audioSRC = AUDIO_SRC + _this.char + "_" + _this.gender + "_" + _this.level + "_" + _this.startVoiceCount + '.wav';
                _this.audioplayer.nativeElement.src = _this.audioSRC;
                _this.audioplayer.nativeElement.play();
                _this.startVoiceCount++;
            }, TIMEOUT_BETWEEN_AUDIO_VOID);
        }
    };
    GameZoneAreaComponent.prototype.ShowImage = function () {
        this.hiddenImage = false;
        this.hiddenVideo = true;
    };
    GameZoneAreaComponent.prototype.ShowVideo = function () {
        this.hiddenImage = true;
        this.hiddenVideo = false;
    };
    GameZoneAreaComponent.prototype.ChangeSources = function () {
        this.imageSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.png';
        this.videoSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.mp4';
        if (this.videoplayer != undefined) {
            this.videoplayer.nativeElement.src = this.videoSRC;
        }
        else {
            console.log("videoplayer is undefined!!!!");
        }
    };
    GameZoneAreaComponent.prototype.NextLevel = function (level) {
        this.imageSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.png';
        this.videoSRC = VIDEO_SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + level + "." + 1 + '.mp4';
        if (this.videoplayer != undefined) {
            this.videoplayer.nativeElement.src = this.videoSRC;
        }
        else {
            console.log("videoplayer is undefined!!!!");
        }
    };
    GameZoneAreaComponent.prototype.ExecuteMessageCommand = function (command) {
        switch (command) {
            case "next":
                var newnumber = Number(this.level);
                newnumber++;
                if (newnumber <= 3) {
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
                if (newnumber > 0) {
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
    };
    __decorate([
        core_1.ViewChild('videoPlayer'),
        __metadata("design:type", Object)
    ], GameZoneAreaComponent.prototype, "videoplayer", void 0);
    __decorate([
        core_1.ViewChild('audioPlayer'),
        __metadata("design:type", Object)
    ], GameZoneAreaComponent.prototype, "audioplayer", void 0);
    GameZoneAreaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-gamezone',
            templateUrl: './gamezone.component.html',
            styleUrls: ['./gamezone.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, core_1.ElementRef, data_service_1.DataService])
    ], GameZoneAreaComponent);
    return GameZoneAreaComponent;
}());
exports.GameZoneAreaComponent = GameZoneAreaComponent;
//# sourceMappingURL=gamezone.component.js.map