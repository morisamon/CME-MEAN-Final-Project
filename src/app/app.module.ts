import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';
import { AppComponent} from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { DisplayComponent } from './components/display/display.component';
import { CopyrightComponent } from './components/copyright & about/copyright.component';

import { AuthenticationModule } from './authentication/authentication.module'
import { AdminModule } from './admin/admin.module'

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ChoosekidComponent } from './components/choosekid/choosekid.component';
import { HttpClientModule } from '@angular/common/http';
import { TrainingComponent } from './components/training/training.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpModule, 
    FormsModule, 
    AppRoutingModule,
    AuthenticationModule,
    AdminModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent, 
    NavComponent, 
    DisplayComponent, 
    CopyrightComponent, 
    routingComponents,
    ChoosekidComponent,
    TrainingComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
