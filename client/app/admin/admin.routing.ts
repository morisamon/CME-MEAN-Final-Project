import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guards'
import { AddKidComponent } from './components/addkid/addkid.component';
import { KidsListComponent } from './components/kids-list/kids-list.component';
import { EditKidComponent } from './components/editkid/editkid.component';

const routes: Routes = [
    { path: 'admin/dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
    { path: 'admin/addkid', component: AddKidComponent, canActivate:[AuthGuard] },
    { path: 'admin/kidslist', component: KidsListComponent, canActivate:[AuthGuard] },
    { path: 'admin/editkid/:id', component: EditKidComponent, canActivate:[AuthGuard] },
];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }