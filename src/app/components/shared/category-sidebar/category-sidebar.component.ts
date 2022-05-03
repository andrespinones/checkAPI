import { Component, OnInit } from '@angular/core';
import { CardsModule } from 'angular-bootstrap-md';
import { BlogPostCard } from 'src/app/blog-post-card.module';
import { CardComponent } from '../../card/card.component';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {

  constructor(private service:ApiService) {}
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
  // posts : BlogPostCard[] = this.cardComponent.posts;
  refreshCategories(){
    this.service.getAllCategories().subscribe(data=>{
      this.CategoryList = data;
      console.log(this.CategoryList);
    })
  }

}
