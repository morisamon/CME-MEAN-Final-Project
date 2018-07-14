import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../admin/auth.guards'

@NgModule({
    imports:      [ 
      BrowserModule, 
      FormsModule,
      AdminRoutingModule
    ],
    declarations: [
      DashboardComponent
    ],
    providers: [
      AuthGuard
    ]
})

export class AdminModule { }