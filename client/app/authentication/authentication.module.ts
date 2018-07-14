import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { ValidateService } from './services/validateService/validate.service';
import { AuthService } from './services/authService/auth.service';
import { AuthenticationRoutingModule } from './authentication.routing';

@NgModule({
    imports:      [ 
      BrowserModule, 
      FormsModule,
      AuthenticationRoutingModule,
    ],
    declarations: [
      RegisterComponent,
      LoginComponent
    ],
    providers: [
        ValidateService,
        AuthService
    ]
})

export class AuthenticationModule { }