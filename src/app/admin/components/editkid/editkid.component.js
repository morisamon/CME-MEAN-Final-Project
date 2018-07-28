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
var EditKidComponent = /** @class */ (function () {
    function EditKidComponent(kidsService, router) {
        this.kidsService = kidsService;
        this.router = router;
    }
    EditKidComponent.prototype.ngOnInit = function () {
        this._id = this.kidsService.kidToEdit._id;
        this.name = this.kidsService.kidToEdit.name;
        this.gender = this.kidsService.kidToEdit.gender;
        this.age = this.kidsService.kidToEdit.age;
        this.address = this.kidsService.kidToEdit.address;
    };
    EditKidComponent.prototype.onEditKidSubmit = function () {
        var _this = this;
        var kid = {
            _id: this._id,
            name: this.name,
            gender: this.gender,
            age: this.age,
            address: this.address
        };
        this.kidsService.editKid(kid).subscribe(function (data) {
            console.log(data.msg);
            if (data.success) {
                _this.router.navigate(['/admin/kidslist']);
            }
            else {
                _this.router.navigate(['/admin/editKid/' + _this._id]);
            }
        });
    };
    EditKidComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-editkid',
            templateUrl: './editkid.component.html',
            styleUrls: ['./editkid.component.css']
        }),
        __metadata("design:paramtypes", [kids_service_1.KidsService,
            router_1.Router])
    ], EditKidComponent);
    return EditKidComponent;
}());
exports.EditKidComponent = EditKidComponent;
//# sourceMappingURL=editkid.component.js.map