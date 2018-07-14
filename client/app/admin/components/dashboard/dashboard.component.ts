import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../authentication/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  user: JSON;

  constructor(
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {      
    this.user = JSON.parse(localStorage.getItem("user"));
  }

}