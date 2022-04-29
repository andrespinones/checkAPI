import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.refreshApis();
  }
  ApiList:any =[]
  refreshApis(){
    this.service.getAllApis().subscribe(data=>{
      console.warn(data);
      this.ApiList = data;
    });
  } 
}
