import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OnBehalfOfClient } from '@azure/msal-common';
import { ApiService } from 'src/app/services/api.service';
import { User } from './user.module';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  userArray: User[] = [];
  columnsToDisplay = ['Name','Email', "Role"];
  dataSource!: MatTableDataSource<User>;

  constructor(private service:ApiService){}


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit():void{
    this.getUsers();
  }
  
  ngOnChanges(): void {
    this.getUsers();
  }

  toggleRole(user:User){
     if(user.role == "Admin"){
       user.role = "User";
     }
     else{
       user.role = "Admin"
     }
  }

  checkRole(user:User) : boolean{
    if(user.role == "User"){;
      return true;
    }
    else{
      return false;
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(){
    this.service.getAllUsers().subscribe(data=>{
      this.userArray = data;
      this.dataSource = new MatTableDataSource<User>(this.userArray);
      console.log(this.userArray);
    })
  }
}








