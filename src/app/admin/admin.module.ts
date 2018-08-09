import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guards'
import { AddKidComponent } from './components/addkid/addkid.component';
import { KidsService } from './services/kids.service';
import { KidsListComponent } from './components/kids-list/kids-list.component';
import { EditKidComponent } from './components/editkid/editkid.component';
import { GoogleMapComponent } from './components/googlemap/googlemap.component';
import { AgmCoreModule } from '@agm/core';
import { GeocodingService } from './services/geocoding.service';
import { GameSessionService } from './services/gamesession.service';
import { KidSessionsListComponent } from './components/kid-sessions-list/kid-sessions-list.component';
import { PieChartComponent, DoughnutChartComponent} from 'angular-d3-charts';
import { SvmVectorService } from './services/svmvectors.service';

@NgModule({
    imports:      [
      BrowserModule,
      FormsModule,
      AdminRoutingModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAKdYwyz2q3cz8o6YeBJyWMA4tpl0Z9_mo'
      })
    ],
    declarations: [
      DashboardComponent,
      AddKidComponent,
      KidsListComponent,
      EditKidComponent,
      GoogleMapComponent,
      KidSessionsListComponent,
      PieChartComponent,DoughnutChartComponent
    ],
    providers: [
      AuthGuard,
      KidsService,
      GeocodingService,
      GameSessionService,
      SvmVectorService
    ]
})

export class AdminModule { }