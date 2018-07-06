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
var DisplayComponent = /** @class */ (function () {
    function DisplayComponent() {
    }
    DisplayComponent.prototype.ngOnInit = function () {
        this.displayLinks = true;
    };
    DisplayComponent.prototype.StartTrain = function () {
        console.log("start train!");
        this.displayLinks = false;
    };
    DisplayComponent.prototype.StartGame = function () {
        console.log("start game!");
        this.displayLinks = false;
    };
    DisplayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'display',
            templateUrl: 'display.component.html',
            styleUrls: ['./display.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], DisplayComponent);
    return DisplayComponent;
}());
exports.DisplayComponent = DisplayComponent;
//# sourceMappingURL=display.component.js.map