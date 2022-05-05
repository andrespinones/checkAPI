import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './user.module';



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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
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
  {name: "Andres", email: "example@hotmail.com", role: false},
];




