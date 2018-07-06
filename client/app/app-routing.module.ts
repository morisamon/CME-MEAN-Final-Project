import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { CopyrightComponent } from './components/copyright & about/copyright.component';

const routes: Routes = [
  {path: 'links', component: DisplayComponent},
  {path: 'copyrigh', component: CopyrightComponent},
  { path: '',
    redirectTo: '/links',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DisplayComponent, CopyrightComponent]
