import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private service:ApiService) { }

  ApiList:Api[] = [];
  ngOnInit(): void {
    this.refreshApis();
  }
  refreshApis(){
    this.service.getAllApis().subscribe(data=>{
      //console.warn(data);
      this.ApiList = data;
    });
  } 
}
