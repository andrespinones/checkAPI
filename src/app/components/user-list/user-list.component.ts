import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit  {

  columnsToDisplay = ['Name', 'Email', "Role"];
  dataSource = new MatTableDataSource<User>(userArray);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}

export interface User{
  email: string;
  role: string;
  name: string;
}

const userArray: User[] = [
  {name: "Pablo", email: "example@gmail.com", role: "admin"},
  {name: "Daniela", email: "example@gmail.com", role: "admin"},
  {name: "Andres", email: "example@gmail.com", role: "admin"},
  {name: "Jorge", email: "example@gmail.com", role: "admin"},
  {name: "Pablo", email: "example@gmail.com", role: "admin"},
  {name: "Daniela", email: "example@gmail.com", role: "user"},
  {name: "Andres", email: "example@gmail.com", role: "user"},
  {name: "Andres", email: "example@gmail.com", role: "user"},
  {name: "Jorge", email: "example@gmail.com", role: "admin"},
  {name: "Pablo", email: "example@gmail.com", role: "admin"},
  {name: "Daniela", email: "example@gmail.com", role: "admin"},
  {name: "Andres", email: "example@gmail.com", role: "user"},
];

