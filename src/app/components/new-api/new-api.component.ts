import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { Category } from 'src/app/models/category';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { CategoryRel } from 'src/app/models/categoryRel';
import { ValidateUrl } from 'src/app/custom-validators/forbidden.directive';
import { Router } from '@angular/router';

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
  urlFormControl = new FormControl('', [Validators.required, ValidateUrl]);
  nameFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  categoryFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  addApiForm = this.formBuilder.group({
    name: this.nameFormControl,
    description: this.descFormControl,
    url: this.urlFormControl,
    categoryID: this.categoryFormControl
  });

  @Output() outputToParent = new EventEmitter<number>();
  constructor(private service:ApiService, private observer: BreakpointObserver, private formBuilder: FormBuilder, private router:Router) {}

  CategoryList: Category[] = [];
  currentUser?:User;
  api:any;
  categoryApiRel!:CategoryRel;
  addApiResp!:number;
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
  apiAddEndpointRedirect(id: number) {
    let route = '/endpoints';
    this.router.navigate([route], { queryParams: { id: id } });
  }

  createApi(){
    this.api = {
      name : this.addApiForm.value.name,
      baseUrl : this.addApiForm.value.url,
      description: this.addApiForm.value.description,
      category: this.addApiForm.value.categoryID
    }
    if(this.addApiForm.status == "INVALID"){
      alert("Asegurate de que los campos esten llenados correctamente")
    }
    else{
      this.service.addApi(this.api).subscribe(data=>{
        this.categoryApiRel = {
          apiID : data.apiID,
          categoryID : this.addApiForm.value.categoryID
        }
        this.service.addApiCategoryRel(this.categoryApiRel).subscribe();
        this.apiAddEndpointRedirect(data.apiID);
      });
    }
  }
}
