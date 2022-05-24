import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Favorite } from 'src/app/models/favorite';
import { NgClass } from '@angular/common';
import { style } from '@angular/animations';



export interface AuthResponseData{
  email: string;
  token: string;
  role: string;
  apiKey: string;
}


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private service:ApiService, private aserv:AuthService, private router: Router) { }
  message?:AuthResponseData;
  dataSource!: MatTableDataSource<any>;
  @Input() ApiList:Api[] = [];
  favorite?:Favorite;

  api:Api = {
    apiID:         0,
    name:          "",
    baseUrl:       "",
    description:    "",
    isFavorite:    false
  }
  columnsToDisplay = ['isFavorite','Name', 'Description']
  ngOnInit(): void {
    this.refreshApis();
    //this.getToken();
  }

  ngOnChanges(){
    console.log("onChanges apiList: ");
    console.log(this.ApiList);
    this.dataSource = new MatTableDataSource<Api>(this.ApiList);
  }

  refreshApis(){
    // this.service.getAllApis().subscribe(resp=>{
    //   this.ApiList = resp;
      console.log("child apiList: ");
      console.log(this.ApiList);
      this.dataSource = new MatTableDataSource<Api>(this.ApiList);
    // });
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
    console.log(this.dataSource);
  }

  modifyFav(api:Api){ 
    this.favorite = {
      apiID : api.apiID,
      userID : 2 //hardcoded por ahora (userID debe ser del usuario)
    }
    if(api.isFavorite == false){
      this.service.addFavorite(this.favorite).subscribe(data=>{});
      api.isFavorite = true;
    }
    else{
      //servicio de borrar registro de favorito(this.favorite)
      this.service.deleteFavorite(this.favorite).subscribe()
      api.isFavorite = false;
    }
  }
}
