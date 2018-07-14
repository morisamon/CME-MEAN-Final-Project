import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../admin/auth.guards'


const routes: Routes = [
    { path: 'admin/dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }