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
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var nav_component_1 = require("./components/nav/nav.component");
var display_component_1 = require("./components/display/display.component");
var copyright_component_1 = require("./components/copyright & about/copyright.component");
var authentication_module_1 = require("./authentication/authentication.module");
var admin_module_1 = require("./admin/admin.module");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                authentication_module_1.AuthenticationModule,
                admin_module_1.AdminModule
            ],
            declarations: [
                app_component_1.AppComponent,
                tasks_component_1.TasksComponent,
                nav_component_1.NavComponent,
                display_component_1.DisplayComponent,
                copyright_component_1.CopyrightComponent,
                app_routing_module_1.routingComponents
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map