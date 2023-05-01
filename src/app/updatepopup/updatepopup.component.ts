import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialogRef<UpdatepopupComponent>) {}

  editData: any;

  ngOnInit(): void {
    this.service.getAllRole().subscribe((result) => {
      this.rolelist = result;
      this.registerForm.setValue({id:this.editData.id, name:this.editData.name, email:this.editData.email, 
      password: this.editData.password, role: this.editData.role, gender:this.editData.gender,
    isactive:this.editData.isactive})
    });

    if (this.data.userCode != null && this.data.userCode != '') {
      this.service.getByCode(this.data.userCode).subscribe((result) => {
        this.editData = result;
      });
    }
  }

  rolelist: any;

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  updateUser(){
    if(this.registerForm.valid){
      this.service.updateUser(this.registerForm.value.id, this.registerForm.value).subscribe(result=>{
        this.toastr.success('Updated Successfully');
        this.dialog.close();
      });
    }else{
      this.toastr.warning('Please Select Role')
    }
  }
}
