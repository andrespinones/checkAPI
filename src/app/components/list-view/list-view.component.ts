import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';





@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private service:ApiService, private aserv:AuthService, private router: Router) { }
  dataSource!: MatTableDataSource<any>;
  @Input() ApiList:Api[] = [];

  columnsToDisplay = ['Name', 'Description']
  ngOnInit(): void {
    this.refreshApis();
    //this.getToken();
  }
  refreshApis(){
    // this.service.getAllApis().subscribe(resp=>{
    //   this.ApiList = resp;
      console.log("child apiList: ");
      console.log(this.ApiList);
      this.dataSource = new MatTableDataSource<Api>(this.ApiList);
    // });
  }

  ngOnChanges(){
    console.log("onChanges apiList: ");
    console.log(this.ApiList);
    this.dataSource = new MatTableDataSource<Api>(this.ApiList);
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
}
