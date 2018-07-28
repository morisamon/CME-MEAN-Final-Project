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
var kids_service_1 = require("../../services/kids.service");
var googlemap_service_1 = require("../../services/googlemap.service");
var router_1 = require("@angular/router");
var GoogleMapComponent = /** @class */ (function () {
    function GoogleMapComponent(googlemapService, kidsService, router) {
        this.googlemapService = googlemapService;
        this.kidsService = kidsService;
        this.router = router;
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.kidsService.getKids()
            .subscribe(function (kids) {
            _this.kids = kids;
        });
    };
    GoogleMapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-googlemap',
            templateUrl: './googlemap.component.html',
            styleUrls: ['./googlemap.component.css']
        }),
        __metadata("design:paramtypes", [googlemap_service_1.GooglemapService,
            kids_service_1.KidsService,
            router_1.Router])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());
exports.GoogleMapComponent = GoogleMapComponent;
//# sourceMappingURL=googlemap.component.js.map