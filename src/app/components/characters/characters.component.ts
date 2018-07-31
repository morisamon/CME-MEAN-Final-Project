import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/DataService/data.service';

@Component({
  selector: 'my-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {

  private level1: Boolean;
  private level2: Boolean;
  private level3: Boolean;

  constructor(private route: ActivatedRoute, private router:Router, private data: DataService) {
    this.route.params.subscribe((params) => this.showRelevantLevel(params));
  }

  ngOnInit() {
  }

  private showRelevantLevel(params){
    console.log(params.levelNumber);
    this.data.SetLevel(params.levelNumber);

    switch(params.levelNumber){
      case "1":
      console.log(this.level1);
      this.level1 = false;
      this.level2 = true;
      this.level3 = true;
      break;
      case "2":
      this.level1 = true;
      this.level2 = false;
      this.level3 = true;
      break;
      case "3":
      this.level1 = true;
      this.level2 = true;
      this.level3 = false;
      break;
    }
  }

  public PlayGame(str){
    console.log(str);
    this.router.navigate(['home/game/', str]);
  }
}