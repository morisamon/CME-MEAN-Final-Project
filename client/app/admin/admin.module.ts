import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guards'
import { AddKidComponent } from './components/addkid/addkid.component';
import { KidsService } from './services/kids.service';
import { KidsListComponent } from './components/kids-list/kids-list.component';

@NgModule({
    imports:      [ 
      BrowserModule, 
      FormsModule,
      AdminRoutingModule
    ],
    declarations: [
      DashboardComponent,
      AddKidComponent,
      KidsListComponent
    ],
    providers: [
      AuthGuard,
      KidsService
    ]
})

export class AdminModule { }