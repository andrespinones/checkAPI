import { asNativeElements, Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoint } from 'src/app/models/endpoint';
import { ApiService } from 'src/app/services/api.service';
import {Location} from '@angular/common';
import { end } from '@popperjs/core';
import { RespCode } from 'src/app/models/respCode';
import { User } from 'src/app/models/user.model';
import { ValidatePath } from 'src/app/custom-validators/forbiddenBraces.directive';

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
export class NewEndpointComponent implements OnInit {

  // required = no se puede ingresar un valor vacio, email - revisa que sea un email
  //se tiene que hacer un validator que revise qeu si exita la API
  nameFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);
  methodFormControl = new FormControl('', [Validators.required]);
  pathFormControl = new FormControl('', [Validators.required, ValidatePath]);
  respsFormControl = new FormControl('', [Validators.required]);

  paramNameFormControl = new FormControl('', [Validators.required]);
  paramDescFormControl = new FormControl('', [Validators.required]);
  paramDataTypeFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  addEndpointForm = this.formBuilder.group({
    description: this.descFormControl,
    method: this.methodFormControl,
    path: this.pathFormControl,
    responses: this.respsFormControl
  });

  params: any[] = [{
    paramName: '',
    dataType: '',
    paramDescription: ''
  }];

  // values: string[] = [];

  DROPDOWN_LIST: string[];
  DROPDOWN_LIST2: string[];
  respCodes!: RespCode[];
  form: any;
  endpoint: any;
  endpointParamsRel:any;
  endpointRespCode:any;
  endpointGroupID:any;
  parameter: any;

  constructor(private formBuilder: FormBuilder,private service:ApiService,private route: ActivatedRoute, private location: Location) {
    this.DROPDOWN_LIST = ['GET','POST','DELETE','PUT']
    this.DROPDOWN_LIST2 = [
      "string", "integer", "boolean"
    ]
  }
  ngOnInit(): void {
    const groupID = this.route.snapshot.queryParamMap.get('groupID');
    this.endpointGroupID=groupID;
    this.getAvailableRespCodes()
    console.log(this.addEndpointForm.valid)
  }

  removevalue(i: number){
    this.params.splice(i,1);
  }

  addvalue(){
    this.params.push({paramName: null, dataType: null, paramDescription: null});
  }

  getAvailableRespCodes(){
    this.service.getAllRespCodes().subscribe(data=>{
      this.respCodes = data;
    })
  }

  createEndpoint(){
    this.endpoint = {
      endpointDescription : this.addEndpointForm.value.description,
      groupID: this.endpointGroupID,
      methodType: this.addEndpointForm.value.method,
      path: this.addEndpointForm.value.path
    }
    console.log(this.endpoint);
    if(this.addEndpointForm.status == "INVALID"){
      alert("Asegurate de que los campos esten llenados correctamente")
    }
    else{
      //agregar servicio post para add endpoint, revisar multiples parametros.
      this.service.addEndpoint(this.endpoint).subscribe(data=>{
        //create endpoint and store new ID to use for next post(endpParams)
        this.params.forEach(element => {
          this.service.addParameter(element).subscribe(param=>{
            this.endpointParamsRel = {
              endpointID : data.endpointID,
              paramID : param.paramID
            }
            //servicio de relacion param endpoint
            this.service.addParameterEndpointRel(this.endpointParamsRel).subscribe()
          })
        });
        for(let response of this.addEndpointForm.value.responses){
          this.endpointRespCode = {
            endpointID : data.endpointID,
            respCodeID: response.respCodeID
          }
          console.log(this.endpointRespCode);
          this.service.addEndpointRespCodes(this.endpointRespCode).subscribe()
        }
      });
      this.location.back()
    }
  }

  isParamsInvalid(){
    if(this.params.length == 0){
      return false;
    }
    let answer = false;
    this.params.forEach(element=>{
      element.forEach((value: any)=>{
        if(value == null){
          answer = true;

        }else{
          answer = false;
        }
      })
    })
    return answer;
  }
}



