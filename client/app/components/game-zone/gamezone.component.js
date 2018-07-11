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
var SRC = "/assets/vidoes/";
var GameZoneAreaComponent = /** @class */ (function () {
    function GameZoneAreaComponent(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.route.params.subscribe(function (params) { return _this.videoName = params; });
        this.showImage = true;
        this.showVidoe = false;
    }
    GameZoneAreaComponent.prototype.ngOnInit = function () {
    };
    GameZoneAreaComponent.prototype.getVideoToShow = function (src) {
        console.log(SRC + this.videoName.id);
    };
    GameZoneAreaComponent.prototype.changeFaceBtnStyle = function (organ, left, top, width, height) {
        if (organ == "face") {
            this.myFaceBtnStyles = { 'left': left, 'top': top, 'width': width, 'height': height };
        }
        else if (organ == "eye") {
            this.myEyeBtnStyles = { 'left': left, 'top': top, 'width': width, 'height': height };
        }
    };
    GameZoneAreaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-gamezone',
            templateUrl: './gamezone.component.html',
            styleUrls: ['./gamezone.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], GameZoneAreaComponent);
    return GameZoneAreaComponent;
}());
exports.GameZoneAreaComponent = GameZoneAreaComponent;
//# sourceMappingURL=gamezone.component.js.map