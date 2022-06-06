import { Component, OnInit, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Favorite } from 'src/app/models/favorite';
import { NgClass } from '@angular/common';
import { style } from '@angular/animations';
import { User } from 'src/app/models/user.model';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  currentUser?: User;
  constructor(private service: ApiService, private aserv: AuthService, private router: Router,
             private popupService: DialogService) { }

  dataSource!: MatTableDataSource<any>;
  @Input() ApiList: Api[] = [];
  favorite?: Favorite;
  apiVisibility: any;

  api: Api = {
    apiID: 0,
    name: "",
    baseUrl: "",
    description: "",
    isFavorite: false,
    isEnabled: true
  }
  columnsToDisplay = ['isFavorite', 'Name', 'Description', 'Visible', 'Delete']

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.refreshApis();
    //this.getToken();
  }

  ngOnChanges() {
    console.log("onChanges apiList: ");
    console.log(this.ApiList);
    this.dataSource = new MatTableDataSource<Api>(this.ApiList);
  }

  refreshApis() {
    console.log("child apiList: ");
    console.log(this.ApiList);
    this.dataSource = new MatTableDataSource<Api>(this.ApiList);
  }

  apiDetailRedirect(id: number) {
    let route = '/api/detail';
    this.router.navigate([route], { queryParams: { id: id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(this.dataSource);
  }

  modifyFav(api: Api) {
    let id = this.currentUser!.userID;
    this.favorite = {
      apiID: api.apiID,
      userID: id
    }
    if (api.isFavorite == false) {
      this.service.addFavorite(this.favorite).subscribe();
      api.isFavorite = true;
    }
    else {
      //servicio de borrar registro de favorito(this.favorite)
      this.service.deleteFavorite(this.favorite).subscribe()
      api.isFavorite = false;
    }
  }
  
  isAdmin(): boolean {
    if (this.currentUser?.role == "Admin") {
      return true;
    }
    else {
      return false;
    }
  }

  confirmVisibilityAction(api: Api) {
    if (api.isEnabled == false) {
      this.popupService.openConfirmaDialog("Are you sure you want to enable this API?\nUsers will be able to view its detail.")
        .afterClosed().subscribe(resp => {
          if (resp) {
            this.toggleEnabled(api)
          }
        })
    }
    else {
      this.popupService.openConfirmaDialog("Are you sure you want to disable this API?\nUsers will not be able to view its detail anymore.")
        .afterClosed().subscribe(resp => {
          if (resp) {
            this.toggleEnabled(api)
          }
        })
    }
  }

  toggleEnabled(api: Api) {
    if (api.isEnabled == false) {
      api.isEnabled = true;
    }
    else {
      api.isEnabled = false;
    }
    this.apiVisibility = {
      apiID: api.apiID,
      isEnabled: api.isEnabled
    }
    this.service.updateApiVisibility(this.apiVisibility).subscribe()
  }

  deleteApi(apiID: number){
    this.service.deleteApi(apiID).subscribe()
    // use filter method on data source so it updates on real time
    this.dataSource.data = this.dataSource.data.filter(
      (a: Api) => a.apiID !== apiID
    );
  }

  confirmDeleteApi(apiID: number){
    this.popupService.openConfirmaDialog("Are you sure you want to delete this API? \n Once deleted you can not undo this action.")
    .afterClosed().subscribe(resp => {
      if(resp){
        this.popupService.openConfirmaDialog("Confirm that you want to delete this API")
        .afterClosed().subscribe(data=>{
          if(data){
            this.deleteApi(apiID);
          }
        })
      }
    })
  }
}
