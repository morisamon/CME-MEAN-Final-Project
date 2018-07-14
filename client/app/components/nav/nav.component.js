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
var data_service_1 = require("../../services/DataService/data.service");
var auth_service_1 = require("../../authentication/services/authService/auth.service");
var router_1 = require("@angular/router");
var NavComponent = /** @class */ (function () {
    function NavComponent(data, authService, router) {
        this.data = data;
        this.authService = authService;
        this.router = router;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.currentButtonDisplayFlag.subscribe(function (flag) {
            _this.flag = flag;
        });
    };
    NavComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        console.log("You are logged out");
        this.router.navigate(['/home/login']);
        return false;
    };
    NavComponent.prototype.StopBtnClicked = function () {
        this.data.changeMessage("stop");
    };
    NavComponent.prototype.PlayBtnClicked = function () {
        this.data.changeMessage("play");
    };
    NavComponent.prototype.ReplayBtnClicked = function () {
        this.data.changeMessage("replay");
    };
    NavComponent.prototype.ChangeCharacterBtnClicked = function () {
        this.data.changeMessage("char");
    };
    NavComponent.prototype.PrevBtnClicked = function () {
        this.data.changeMessage("prev");
    };
    NavComponent.prototype.NextBtnClicked = function () {
        this.data.changeMessage("next");
    };
    NavComponent.prototype.HomeBtnClicked = function () {
        this.data.changeMessage("home");
    };
    NavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-menu',
            templateUrl: 'nav.component.html',
            styleUrls: ['./nav.component.css']
        }),
        __metadata("design:paramtypes", [data_service_1.DataService,
            auth_service_1.AuthService,
            router_1.Router])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map