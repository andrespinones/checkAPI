import { Component, OnInit } from '@angular/core';
import { User } from './user-list.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {



  userArray: User[] = [
    {name: "Pablo", email: "example@gmail.com", role: "admin"},
    {name: "Daniela", email: "example@gmail.com", role: "admin"},
    {name: "Andres", email: "example@gmail.com", role: "admin"},
    {name: "Jorge", email: "example@gmail.com", role: "admin"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
