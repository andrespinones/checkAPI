import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

export interface AuthResponse {
  mensaje: string;
  token:   string;
}

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private service:ApiService, private aserv:AuthService, private router: Router) { }
  message?:AuthResponse;
  ApiList:Api[] = [];
  dataSource = new MatTableDataSource<Api>(this.ApiList);

  columnsToDisplay = ['Name', 'Description']
  ngOnInit(): void {
    this.refreshApis();
    // this.getToken();
  }
  refreshApis(){
    this.service.getAllApis().subscribe(resp=>{
      this.ApiList = resp;
      console.log(this.ApiList)
    });
  }

  getToken(){
    this.aserv.getToken().subscribe(data=>{
      this.message = data;
      console.log(this.message?.token);
    })
  }

  apiDetailRedirect(api: Api){
    let route = '/api/detail';
    this.router.navigate([route], { queryParams: { id: api.apiID } });
    console.log(api.apiID)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
