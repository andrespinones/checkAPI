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
  {name: "Andrés Piñones Besnier", email: "A01570150@tec.mx", role: true},
  {name: "José Pablo Cruz Ramos", email: "A01138740@tec.mx", role: false},
  {name: "Daniela Tamez Lucio", email: "A01197468@tec.mx", role: true},
  {name: "Jorge Luis Ayala Hernández", email: "A00828633@tec.mx", role: true},
  {name: "Lucas Eduardo Idígoras", email: "A00827751@tec.mx", role: false},
];




