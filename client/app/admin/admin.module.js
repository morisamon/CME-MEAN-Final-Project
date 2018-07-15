"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var admin_routing_1 = require("./admin.routing");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var auth_guards_1 = require("./auth.guards");
var addkid_component_1 = require("./components/addkid/addkid.component");
var kids_service_1 = require("./services/kids.service");
var kids_list_component_1 = require("./components/kids-list/kids-list.component");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                admin_routing_1.AdminRoutingModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                addkid_component_1.AddKidComponent,
                kids_list_component_1.KidsListComponent
            ],
            providers: [
                auth_guards_1.AuthGuard,
                kids_service_1.KidsService
            ]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map