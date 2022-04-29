import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { ApiService2 } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private service:ApiService, private aserv:ApiService2) { }

  ApiList:Api[] = [];
  ngOnInit(): void {
    this.refreshApis();
    this.getToken();
  }
  refreshApis(){
    this.service.getAllApis().subscribe(data=>{
      //console.warn(data);
      this.ApiList = data;
    });
  }

  getToken(){
    this.aserv.getToken().subscribe(data=>{
      console.log(data);
    })
  }
}
