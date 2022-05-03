import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/models/category';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private service:ApiService, private observer: BreakpointObserver) {}

  CategoryList: Category[] =[];
  fixedCategories: Category[] = [
    {
        id: -1,
        name: 'All',
    },
    {
        id: -2,
        name: 'Other',
    }];

  ngOnInit(): void {
    this.refreshCategories();
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

  // posts : BlogPostCard[] = this.cardComponent.posts;
  refreshCategories(){
    this.service.getAllCategories().subscribe(data=>{
      this.CategoryList = data;
      console.log(this.CategoryList);
    })
  }
}
