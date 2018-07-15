"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var auth_guards_1 = require("./auth.guards");
var addkid_component_1 = require("./components/addkid/addkid.component");
var kids_list_component_1 = require("./components/kids-list/kids-list.component");
var routes = [
    { path: 'admin/dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guards_1.AuthGuard] },
    { path: 'admin/addkid', component: addkid_component_1.AddKidComponent, canActivate: [auth_guards_1.AuthGuard] },
    { path: 'admin/kidslist', component: kids_list_component_1.KidsListComponent, canActivate: [auth_guards_1.AuthGuard] },
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
//# sourceMappingURL=admin.routing.js.map