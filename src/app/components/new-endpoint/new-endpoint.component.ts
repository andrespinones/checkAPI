import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-new-endpoint',
  templateUrl: './new-endpoint.component.html',
  styleUrls: ['./new-endpoint.component.css']
})
export class NewEndpointComponent {

  // required = no se puede ingresar un valor vacio, email - revisa que sea un email
  //se tiene que hacer un validator que revise qeu si exita la API 
  urlFormControl = new FormControl('', [Validators.required]);
  nombreFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  DROPDOWN_LIST: Method[];

  DROPDOWN_LIST2: string[];
  form: any;

  constructor(private formBuilder: FormBuilder) {
    this.DROPDOWN_LIST = [
      {
        type: "GET"
      },
      {
        type: "POST"
      },
      {
        type: "DELETE"
      },
      {
        type: "PUT"
      }

    ]

    this.DROPDOWN_LIST2 = [
      "STRING", "INT64", "BOOLEAN", "INT32"
    ]
  }


  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  buildContacts(contacts: {phoneNo: string; emailAddr: string;}[] = []) {
    return this.formBuilder.array(contacts.map(contact => this.formBuilder.group(contact)));
  }

  addContactField() {
    this.contacts.push(this.formBuilder.group({phoneNo: null, emailAddr: null}))
  }

  removeContactField(index: number): void {
    if (this.contacts.length > 1) this.contacts.removeAt(index);
    else this.contacts.patchValue([{phoneNo: null, emailAddr: null}]);
  }

   
}

export class Method{
    type: string | undefined; 
}



