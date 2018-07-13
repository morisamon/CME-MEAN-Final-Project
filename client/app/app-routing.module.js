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
var display_component_1 = require("./components/display/display.component");
var copyright_component_1 = require("./components/copyright & about/copyright.component");
var levels_component_1 = require("./components/levels-menu/levels.component");
var characters_component_1 = require("./components/characters/characters.component");
var gamezone_component_1 = require("./components/game-zone/gamezone.component");
var register_component_1 = require("./components/register/register.component");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: display_component_1.DisplayComponent },
    { path: 'copyright', component: copyright_component_1.CopyrightComponent },
    { path: 'home/levels', component: levels_component_1.LevelsComponent },
    { path: 'home', component: display_component_1.DisplayComponent },
    { path: 'home/levels/characters/:levelNumber', component: characters_component_1.CharactersComponent },
    { path: 'home/register', component: register_component_1.RegisterComponent },
    { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routingComponents = [display_component_1.DisplayComponent, copyright_component_1.CopyrightComponent, levels_component_1.LevelsComponent, characters_component_1.CharactersComponent, gamezone_component_1.GameZoneAreaComponent, register_component_1.RegisterComponent];
//# sourceMappingURL=app-routing.module.js.map