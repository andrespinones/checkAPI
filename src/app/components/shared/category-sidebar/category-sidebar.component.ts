import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { Category } from 'src/app/models/category';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private service:ApiService, private observer: BreakpointObserver) {}

  apiList:Api[] = [];
  currentUser!: User;
  //categoryID: number;
  CategoryList: Category[] = [];
  fixedCategories: Category[] = [
    {
        categoryID: -1,
        name: 'All',
        APIcount: 0,
    },
    {
        categoryID: -2,
        name: 'Other',
        APIcount: 0,
    }];

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.refreshCategories();
    this.refreshApis();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  refreshCategories(){
    this.service.getAllCategories().subscribe(data=>{
      this.CategoryList = data;
      console.log(this.CategoryList);
    })
  }

  refreshApis(){
    this.service.getAllApis().subscribe(resp=>{
      this.apiList = resp;
      console.log(this.apiList)
    });
  }

  refreshCategoriesFiltered(categoryID: number){
    console.log(categoryID); 
    this.service.getAPIsByCategory(categoryID,this.currentUser.userID).subscribe(data=>{
      this.apiList = data;
      console.log(this.apiList);
    })
  }

}
