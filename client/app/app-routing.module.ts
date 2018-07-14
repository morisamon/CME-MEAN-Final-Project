import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { CopyrightComponent } from './components/copyright & about/copyright.component';
import { LevelsComponent } from './components/levels-menu/levels.component';
import { CharactersComponent } from './components/characters/characters.component';
import { GameZoneAreaComponent } from './components/game-zone/gamezone.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DisplayComponent},
  { path: 'copyright', component: CopyrightComponent},
  { path: 'home/levels', component: LevelsComponent},
  { path: 'home', component: DisplayComponent},
  { path: 'home/levels/characters/:levelNumber', component: CharactersComponent},
  { path: 'home/game/:id', component: GameZoneAreaComponent},
  { path: 'home/register', component: RegisterComponent},
  
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DisplayComponent, CopyrightComponent, LevelsComponent, CharactersComponent, GameZoneAreaComponent, RegisterComponent]
