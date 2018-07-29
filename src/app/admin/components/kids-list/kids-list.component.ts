import { Component, OnInit } from '@angular/core';
import { KidsService } from '../../services/kids.service';
import { Router } from '@angular/router';
import { Kid } from '../../Kid';

@Component({
  selector: 'app-kids-list',
  templateUrl: './kids-list.component.html',
  styleUrls: ['./kids-list.component.css']
})

export class KidsListComponent { 

  kids: Kid[];
  ageFilter: Number;
  genderFilter: String;
  nameFilter: String
  
  constructor(
    private kidsService: KidsService,
    private router: Router) 
  { }

  ngOnInit() {      
    this.refreshList();
  }

  onFilter() {
    this.kidsService.getKidsWithFilter(this.ageFilter, this.genderFilter, this.nameFilter)
    .subscribe(kids => {
        this.kids = kids;
    });
  }

  onAddKid() {
    this.router.navigate(['/admin/addkid']);
  }

  onMap() {
    this.router.navigate(['/admin/map']);
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

  editKid(kid) {
    this.kidsService.kidToEdit = kid;
    this.router.navigate(['/admin/editkid/', kid._id]);   
  }

  refreshList() {
    this.kidsService.getKids()
    .subscribe(kids => {
        this.kids = kids;
    });
  }

}