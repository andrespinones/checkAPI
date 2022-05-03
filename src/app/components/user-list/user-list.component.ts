import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit  {

  userArray: User[] = [];
  columnsToDisplay = ['Name', 'Email', "Role"];
  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  dataSource = new MatTableDataSource<User>(userArray);
 

  toggleRole(user:User){
     user.role = !user.role
  }

}

export interface User{
  email: string;
  role: boolean;
  name: string;
}

var userArray = [
  {name: "Pablo", email: "example@gmail.com", role: true},
  {name: "Daniela", email: "example@gmail.com", role: false},
  {name: "Andres", email: "example@gmail.com", role: true},
  {name: "Jorge", email: "example@gmail.com", role: true},
  {name: "Pablo", email: "example@gmail.com", role: false},
  {name: "Daniela", email: "example@gmail.com", role: false},
  {name: "Andres", email: "example@gmail.com", role: true},
  {name: "Andres", email: "example@gmail.com", role: false},
  {name: "Jorge", email: "example@gmail.com", role: true},
  {name: "Pablo", email: "example@gmail.com", role: false},
  {name: "Daniela", email: "example@gmail.com", role: true},
  {name: "Andres", email: "example@gmail.com", role: false},
];




