import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { Category } from 'src/app/models/category';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

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

export class NewApiComponent implements OnInit {

  // required = no se puede ingresar un valor vacio, email - revisa que sea un email
  //se tiene que hacer un validator que revise qeu si exita la API 
  urlFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  addApiForm = this.formBuilder.group({
    name: this.nameFormControl,
    description: this.descFormControl,
    url: this.descFormControl
  });

  constructor(private service:ApiService, private observer: BreakpointObserver, private formBuilder: FormBuilder,) {}

  CategoryList: Category[] = [];
  currentUser?:User;
  api:any;
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.refreshCategories();
  }

  refreshCategories(){
    this.service.getAllCategories().subscribe(data=>{
      this.CategoryList = data;
      console.log(this.CategoryList);
    })
  }

  createApi(){
    this.api = {
      name : this.addApiForm.value.name,
      baseUrl : this.addApiForm.value.url,
      description: this.addApiForm.value.description 
    }
    console.log(this.api)
    this.service.addApi(this.api).subscribe(data=>{});

    console.log('ADD API FORM:', this.addApiForm.value)
  }

}