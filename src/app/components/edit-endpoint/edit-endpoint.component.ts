import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoint } from 'src/app/models/endpoint';
import { ApiService } from 'src/app/services/api.service';
import {Location} from '@angular/common';
import { end } from '@popperjs/core';
import { RespCode } from 'src/app/models/respCode';
import { Parameter } from 'src/app/models/parameter';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-endpoint',
  templateUrl: './edit-endpoint.component.html',
  styleUrls: ['./edit-endpoint.component.css']
})
export class EditEndpointComponent implements OnInit {

  // required = no se puede ingresar un valor vacio, email - revisa que sea un email
  //se tiene que hacer un validator que revise qeu si exita la API
  //nameFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);
  methodFormControl = new FormControl('', [Validators.required]);
  pathFormControl = new FormControl('', [Validators.required]);
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
  allRespCodes!: RespCode[];
  form: any;
  endpoint: any;
  endpointParamsRel:any;
  endpointRespCode:any;
  endpointGroupID:any;
  receivedEndpointID:any;
  parameter: any;
  receivedEndpoint!:Endpoint;
  receivedParams!:Parameter[];
  receivedRespCodes!:RespCode[];
  receivedParamsTypes: string[]
  selectedRequestedMethod: string;
  selectedRespCodes: RespCode[];
  selectedRespCodesID: number[];

  constructor(private formBuilder: FormBuilder,private service:ApiService,private route: ActivatedRoute, private location: Location) {
    this.DROPDOWN_LIST = ['GET','POST','DELETE','PUT']
    this.DROPDOWN_LIST2 = [
      "string", "integer", "boolean"
    ]
    this.selectedRequestedMethod = '';
    this.receivedParamsTypes = [];
    this.selectedRespCodesID = [];
    this.selectedRespCodes = [];
  }
  ngOnInit(): void {
    const endpointID = this.route.snapshot.queryParamMap.get('endpointID');
    this.receivedEndpointID=endpointID
    this.service.getRespCodesbyEndpointID(this.receivedEndpointID).subscribe(resp=>{
      for(let item of resp){
        this.selectedRespCodesID.push(item.respCodeID)
      }
      this.getEndpointDetail()
      this.getAvailableRespCodes()
    })
  }

  removevalue(i: number){
    this.params.splice(i,1);
  }

  cancel(){
    this.location.back()
  }

  // isEditing(){
  //   return this.receivedEndpointID!=''
  // }
  getEndpointDetail(){
    this.service.getEndpointbyID(this.receivedEndpointID).subscribe(resp=>{
      this.receivedEndpoint = resp[0];
      this.selectedRequestedMethod = this.receivedEndpoint.methodType;  //methodType assign to a local global variable for successful binding
      this.addEndpointForm.controls['method'].setValue(this.selectedRequestedMethod)
    })
    this.service.getParamsbyEndpointID(this.receivedEndpointID).subscribe(resp=>{
      this.receivedParams = resp;
      this.fillParamsWithReceivedParams();
    })
  }

  fillParamsWithReceivedParams(){
    this.params = []; //does empty params to filled from the received params
    this.receivedParams.forEach(element => {
        this.params.push({paramName: element.paramName, dataType: element.dataType, paramDescription: element.paramDescription});
        this.receivedParamsTypes.push(element.dataType);
    })
  }


  addvalue(){
    this.params.push({paramName: "", dataType: "", paramDescription: ""});
  }

  getAvailableRespCodes(){
    this.service.getAllRespCodes().subscribe(data=>{
      this.allRespCodes = data;
    })
  }

  updateEndpointData(){
    this.endpoint = {
      endpointDescription : this.addEndpointForm.value.description,
      methodType: this.addEndpointForm.value.method,
      path: this.addEndpointForm.value.path
    }
    console.log(this.endpoint);
    if(this.addEndpointForm.status == "INVALID"){
      alert("Asegurate de que los campos esten llenados correctamente")
    }
    else{
      //agregar servicio UPDATE para update/edit endpoint
      this.service.editEndpointData(this.receivedEndpointID,this.endpoint).subscribe()
        //delete all params for this endpoint to create new ones if added
        //delete params relation 
        for (let params of this.receivedParams){
          this.service.deleteParameter(params.paramID).subscribe();
        }
        //delete resp codes associated to this endpoint
        this.service.deleteRespCodesRel(this.receivedEndpointID).subscribe();
        //create new params 
        this.params.forEach(element => {
          this.service.addParameter(element).subscribe(param=>{
            this.endpointParamsRel = {
              endpointID : this.receivedEndpointID,
              paramID : param.paramID
            }
            console.log(this.endpointParamsRel)
            //servicio de relacion param endpoint
            this.service.addParameterEndpointRel(this.endpointParamsRel).subscribe()
          })
        });
        for(let response of this.addEndpointForm.value.responses){
          this.endpointRespCode = {
            endpointID : this.receivedEndpointID,
            respCodeID: response
          }
          this.service.addEndpointRespCodes(this.endpointRespCode).subscribe()
        }
      this.location.back()
    }
  }
}
