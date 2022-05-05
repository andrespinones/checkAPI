import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-api',
  templateUrl: './new-api.component.html',
  styleUrls: ['./new-api.component.css']
})
export class NewApiComponent  {

  // options: FormGroup;
  // hideRequiredControl = new FormControl(false);
  // floatLabelControl = new FormControl('auto');
  user = "Alan Lopez";
  DROPDOWN_LIST: Category[];

  constructor() {
    this.DROPDOWN_LIST = [
      {
        name: "Economics"
      },
      {
        name: "Sports"
      },
      {
        name: "Entertainment"
      }

    ]
  }
   
}

export class Category{
    name: string | undefined; 
}

