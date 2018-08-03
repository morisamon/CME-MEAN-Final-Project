import { Component, OnInit } from '@angular/core';
import { GameSessionService } from '../../services/gamesession.service';
import { KidsService } from '../../services/kids.service';
import { GameSession } from '../../GameSession';
import { Kid } from '../../Kid';

@Component({
  selector: 'app-kid-sessions-list',
  templateUrl: './kid-sessions-list.component.html',
  styleUrls: ['./kid-sessions-list.component.css']
})
export class KidSessionsListComponent implements OnInit {

  kid: Kid;
  sessions: GameSession[];
  totalTimeFilter: Number;
  levelFilter: Number;
  characterFilter: String;

  constructor(
    private gameSessionsService: GameSessionService,
    private kidsService: KidsService
  ) { }

  ngOnInit() {
    this.kid = this.kidsService.kidToShowSessions;
    this.refreshList();
  }

  deleteSession(id){
    this.gameSessionsService.deleteSession(id).subscribe(data => {
      if(data.n == 1){
        for(var i = 0;i < this.sessions.length;i++){
            if(this.sessions[i]._id == id){
              this.sessions.splice(i, 1);
            }
        }
    }
    });
    this.refreshList();
  }

  onFilter() {
    this.gameSessionsService.getGameSessionsWithFilter(this.kid._id, this.totalTimeFilter, this.levelFilter, this.characterFilter)
    .subscribe(sessions => {
        this.sessions = sessions;
    });
  }

  refreshList() {
    this.gameSessionsService.getSessionsByKidID(this.kid._id)
    .subscribe(data => {
      this.sessions = data;  
    });
  }

}
