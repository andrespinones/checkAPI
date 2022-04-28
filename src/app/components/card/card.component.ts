import { Component, Input, OnInit } from '@angular/core';
import { BlogPostCard } from '../../blog-post-card.module';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  data!: BlogPostCard;

  constructor() { }

  ngOnInit(): void {
  }

}
