import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { CopyrightComponent } from './components/copyright & about/copyright.component';
import { LevelsComponent } from './components/levels-menu/levels.component';
import { CharactersComponent } from './components/characters/characters.component';
import { GameZoneAreaComponent } from './components/game-zone/gamezone.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { ChoosekidComponent } from './components/choosekid/choosekid.component';
import { AuthGuard } from './admin/auth.guards';

const routes: Routes = [
  { path: '', redirectTo: 'home/choosekid', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/choosekid', pathMatch: 'full'},
  { path: 'home/levels', redirectTo: 'home/levels/characters/1', pathMatch: 'full' },
  { path: 'home/levels/characters/:levelNumber', component: CharactersComponent, canActivate:[AuthGuard] },
  { path: 'home/game/:id', component: GameZoneAreaComponent, canActivate:[AuthGuard] },
  { path: 'home/register', component: RegisterComponent},
  { path: 'home/choosekid', component: ChoosekidComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  DisplayComponent,
  CopyrightComponent,
  LevelsComponent,
  CharactersComponent,
  GameZoneAreaComponent,
]
