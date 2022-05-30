import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OnBehalfOfClient } from '@azure/msal-common';
import { ApiService } from 'src/app/services/api.service';
import { Client } from 'src/app/models/client';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  userArray: Client[] = [];
  columnsToDisplay = ['Name','Email', "Role"];
  dataSource!: MatTableDataSource<Client>;

  popUpBoolean:boolean = false; 
  constructor(private service:ApiService, private dialogService: DialogService){}

  

  cliente: Client = {
    userID: 0,
    email:  "",
    firstName: "",
    lastNme: "",
    role: ""
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit():void{
    this.getUsers();
  }
  
  ngOnChanges(): void {
    this.getUsers();
  }

  toggleRole(user:Client){
     if(user.role == "Admin"){
       user.role = "User";
       this.cliente.role = "User";
       this.cliente.email = user.email
       this.updateUserRole()
     }
     else{
       user.role = "Admin";
       this.cliente.role = "Admin"
       this.cliente.email = user.email
       this.updateUserRole()
     }
  }

  checkRole(user:Client) : boolean{
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
      this.dataSource = new MatTableDataSource<Client>(this.userArray);
      console.log(this.userArray);
    })
  }

  updateUserRole(){
    var datosCliente = {
    userID: this.cliente.userID,
    email:  this.cliente.email,
    firstName: this.cliente.firstName,
    lastNme: this.cliente.lastNme,
    role: this.cliente.role
    }
    this.service.updateUserRole(datosCliente).subscribe(data=>{
    })
  }

  confirmAction(user: Client){
    this.dialogService.openConfirmaDialog("Are you sure you want to change this role?")
    .afterClosed().subscribe(res => {
      if(res){
        this.toggleRole(user);
      }
    })
  }
}









