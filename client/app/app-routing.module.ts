import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { CopyrightComponent } from './components/copyright & about/copyright.component';
import { LevelsComponent } from './components/levels-menu/levels.component';

const routes: Routes = [
  {path: 'home', component: DisplayComponent},
  {path: 'copyrigh', component: CopyrightComponent},
  {path: 'levels', component: LevelsComponent},

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
export const routingComponents = [DisplayComponent, CopyrightComponent, LevelsComponent]
