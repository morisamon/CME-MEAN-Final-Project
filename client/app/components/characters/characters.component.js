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
var CharactersComponent = /** @class */ (function () {
    function CharactersComponent(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.route.params.subscribe(function (params) { return _this.showRelevantLevel(params); });
    }
    CharactersComponent.prototype.ngOnInit = function () {
    };
    CharactersComponent.prototype.showRelevantLevel = function (params) {
        console.log(params.levelNumber);
        switch (params.levelNumber) {
            case "1":
                console.log(this.level1);
                this.level1 = true;
                this.level2 = false;
                this.level3 = false;
                break;
            case "2":
                this.level1 = false;
                this.level2 = true;
                this.level3 = false;
                break;
            case "3":
                this.level1 = false;
                this.level2 = false;
                this.level3 = true;
                break;
        }
    };
    CharactersComponent.prototype.PlayGame = function (str) {
        console.log(str);
        this.router.navigate(['home/game/', str]);
    };
    CharactersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-characters',
            templateUrl: './characters.component.html',
            styleUrls: ['./characters.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router])
    ], CharactersComponent);
    return CharactersComponent;
}());
exports.CharactersComponent = CharactersComponent;
//# sourceMappingURL=characters.component.js.map