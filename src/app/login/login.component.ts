import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


constructor(private builder:FormBuilder, private toastr:ToastrService,
  private service:AuthService, private router:Router){
    sessionStorage.clear();
  }

userData:any;

loginForm = this.builder.group({
  username: this.builder.control('', Validators.required),
  password: this.builder.control('', Validators.required),
  })

proceedLogin(){
  this.service.getByCode(this.loginForm.value.username).subscribe(result =>{
    this.userData = result;
    console.log(this.userData);
    if (this.userData.password === this.loginForm.value.password){
      if(this.userData.isactive){
        sessionStorage.setItem('username', this.userData.id);
        sessionStorage.setItem('userrole', this.userData.role);
        this.router.navigate([''])
      }
      else{
        this.toastr.error('Please Contact Admin','User Currently is inactive');
      }
    }
    else{
      this.toastr.error('Invalid Credentials!');
    }
    });
    }
}
