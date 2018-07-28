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
var router_1 = require("@angular/router");
var KidsListComponent = /** @class */ (function () {
    function KidsListComponent(kidsService, router) {
        this.kidsService = kidsService;
        this.router = router;
    }
    KidsListComponent.prototype.ngOnInit = function () {
        this.refreshList();
    };
    KidsListComponent.prototype.onAddKid = function () {
        this.router.navigate(['/admin/addkid']);
    };
    KidsListComponent.prototype.deleteKid = function (id) {
        var kids = this.kids;
        this.kidsService.deleteKid(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < kids.length; i++) {
                    if (kids[i]._id == id) {
                        kids.splice(i, 1);
                    }
                }
            }
        });
        this.refreshList();
    };
    KidsListComponent.prototype.editKid = function (kid) {
        this.kidsService.kidToEdit = kid;
        this.router.navigate(['/admin/editkid/', kid._id]);
    };
    KidsListComponent.prototype.refreshList = function () {
        var _this = this;
        this.kidsService.getKids()
            .subscribe(function (kids) {
            _this.kids = kids;
        });
    };
    KidsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-kids-list',
            templateUrl: './kids-list.component.html',
            styleUrls: ['./kids-list.component.css']
        }),
        __metadata("design:paramtypes", [kids_service_1.KidsService,
            router_1.Router])
    ], KidsListComponent);
    return KidsListComponent;
}());
exports.KidsListComponent = KidsListComponent;
//# sourceMappingURL=kids-list.component.js.map