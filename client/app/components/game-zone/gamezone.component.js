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
var SRC = "/assets/videos/";
var MAX_LEVEL = 3;
var GameZoneAreaComponent = /** @class */ (function () {
    function GameZoneAreaComponent(route, router, elementRef) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.elementRef = elementRef;
        this.subLevel = 1;
        this.route.params.subscribe(function (params) {
            _this.videoName = params;
            _this.char = params.id.split('_')[0];
            _this.level = params.id.split('_')[1].split('.')[0];
            _this.videoSRC = _this.getSrcToShow('.mp4');
            _this.imageSRC = _this.getSrcToShow('.png');
        });
        this.ShowImage();
    }
    GameZoneAreaComponent.prototype.ngAfterViewInit = function () {
        //this.videoplayer.nativeElement.play(); //works!
    };
    GameZoneAreaComponent.prototype.ngOnInit = function () {
    };
    GameZoneAreaComponent.prototype.getSrcToShow = function (type) {
        var finalSRC = SRC + this.charType(this.videoName.id) + "/" + this.videoName.id + type;
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
        this.videoplayer.nativeElement.play(); //works!
    };
    GameZoneAreaComponent.prototype.VideoEnded = function () {
        console.log("The video is stoped");
        this.subLevel++;
        if (this.subLevel <= MAX_LEVEL) {
            this.ChangeSources(this.subLevel);
            this.ShowImage();
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
    GameZoneAreaComponent.prototype.ChangeSources = function (count) {
        this.imageSRC = SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.png';
        this.videoSRC = SRC + this.charType(this.videoName.id) + "/" + this.char + "_" + this.level + "." + this.subLevel + '.mp4';
    };
    __decorate([
        core_1.ViewChild('videoPlayer'),
        __metadata("design:type", Object)
    ], GameZoneAreaComponent.prototype, "videoplayer", void 0);
    GameZoneAreaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-gamezone',
            templateUrl: './gamezone.component.html',
            styleUrls: ['./gamezone.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, core_1.ElementRef])
    ], GameZoneAreaComponent);
    return GameZoneAreaComponent;
}());
exports.GameZoneAreaComponent = GameZoneAreaComponent;
//# sourceMappingURL=gamezone.component.js.map