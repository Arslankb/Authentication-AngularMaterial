import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {

  constructor(private service:AuthService, private dialog:MatDialog){
    this.loadUser();
  }

  userList:any;
  dataSource:any;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  loadUser(){
    this.service.getAll().subscribe(result=>{
      this.userList=result;
      this.dataSource=new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];

  updateUser(code:any){
    const popUp = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data:{
        userCode:code,
      }
    })

    popUp.afterClosed().subscribe(result=>{
      this.loadUser();
    });
  }

  openDialogBox(){
    
  }
}
