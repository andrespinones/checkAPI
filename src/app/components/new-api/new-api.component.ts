import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-api',
  templateUrl: './new-api.component.html',
  styleUrls: ['./new-api.component.css']
})

export class NewApiComponent  {


  // required = no se puede ingresar un valor vacio, email - revisa que sea un email
  //se tiene que hacer un validator que revise qeu si exita la API 
  urlFormControl = new FormControl('', [Validators.required]);
  nombreFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();


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

