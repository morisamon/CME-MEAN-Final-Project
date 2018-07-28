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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var router_1 = require("@angular/router");
var DataService = /** @class */ (function () {
    function DataService(route, router) {
        this.route = route;
        this.router = router;
        this.messageSource = new BehaviorSubject_1.BehaviorSubject("default message");
        this.currentMessage = this.messageSource.asObservable();
        this.levelSource = new BehaviorSubject_1.BehaviorSubject("0");
        this.currentLevel = this.levelSource.asObservable();
        this.buttonDisplayFlagSource = new BehaviorSubject_1.BehaviorSubject(false);
        this.currentButtonDisplayFlag = this.buttonDisplayFlagSource.asObservable();
    }
    DataService.prototype.changeMessage = function (message) {
        this.executeCommand(message);
    };
    DataService.prototype.executeCommand = function (message) {
        switch (message) {
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
    };
    DataService.prototype.changeChar = function (level) {
        console.log("change to char" + level);
    };
    DataService.prototype.SetLevel = function (level) {
        this.currentLevel = level;
        this.levelSource.next(level);
    };
    DataService.prototype.HiddenNavButtons = function (flag) {
        this.buttonDisplayFlagSource.next(flag);
    };
    DataService.prototype.CancelLastAction = function () {
        this.messageSource.next("default message");
    };
    DataService.prototype.SetGender = function (gender) {
        this.gender = gender;
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map