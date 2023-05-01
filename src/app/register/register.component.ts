import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {


  constructor(private builder:FormBuilder, private toastr:ToastrService,
    private service:AuthService, private router:Router){}


  registerForm=this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('',Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
  })

  proceedregistration(){
    if(this.registerForm.valid){
      this.service.proceedRegister(this.registerForm.value).subscribe(result => {
        this.toastr.success('Please Contact Admin For Enable Your Access','Registered Successfully'),
        this.router.navigate(['login']);
      });
    } 
    else{
      this.toastr.warning('Please Enter Valid Data!');
    }
  }
}
