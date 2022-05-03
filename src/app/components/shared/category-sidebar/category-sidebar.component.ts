import { Component, OnInit } from '@angular/core';
import { CardsModule } from 'angular-bootstrap-md';
import { BlogPostCard } from 'src/app/blog-post-card.module';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {

  constructor(private cardComponent: CardComponent) {
  }

  ngOnInit(): void {
  }
  posts : BlogPostCard[] = this.cardComponent.posts;

}
