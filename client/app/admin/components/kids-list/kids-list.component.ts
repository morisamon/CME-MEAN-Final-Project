import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Router } from '@angular/router';
import { Kid } from '../../Kid';

@Component({
  moduleId: module.id,
  selector: 'app-kids-list',
  templateUrl: './kids-list.component.html',
  styleUrls: ['./kids-list.component.css']
})

export class KidsListComponent { 

  kids: Kid[];
  
  constructor(
    private kidsService: KidsService,
    private router: Router) 
  { }

  ngOnInit() {      
    this.refreshList();
  }

  onAddKid() {
    this.router.navigate(['/admin/addkid']);
  }

  deleteKid(id){
    var kids = this.kids;
    
    this.kidsService.deleteKid(id).subscribe(data => {
        if(data.n == 1){
            for(var i = 0;i < kids.length;i++){
                if(kids[i]._id == id){
                    kids.splice(i, 1);
                }
            }
        }
    });
    this.refreshList();
  }

  refreshList() {
    this.kidsService.getKids()
    .subscribe(kids => {
        this.kids = kids;
    });
  }

}