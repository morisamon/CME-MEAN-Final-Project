import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';
import { AppComponent} from './app.component';
import { TasksComponent} from './components/tasks/tasks.component';
import { NavComponent } from './components/nav/nav.component';
import { DisplayComponent } from './components/display/display.component';
import { CopyrightComponent } from './components/copyright & about/copyright.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent, TasksComponent, NavComponent, DisplayComponent, CopyrightComponent, routingComponents, RegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
