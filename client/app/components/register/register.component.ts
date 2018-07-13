import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateService } from '../../services/validateService/validate.service'
import { AuthService } from '../../services/authService/auth.service'

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html', 
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private authService:AuthService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      //this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      console.log("Please fill in all fields");
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      console.log("Please use a valid email");
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      console.log(data.msg);
      if(data.success){
        //this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/home/register']);
      } else {
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/home/register']);
      }
    });
  }

}
