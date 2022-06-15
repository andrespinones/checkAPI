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
    //name: this.nameFormControl,
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
  receivedEndpointID:any;
  parameter: any;
  receivedEndpoint!:Endpoint;
  receivedParams!:Parameter[];
  receivedRespCodes!:RespCode[];
  receivedParamsTypes: string[]
  selectedRequestedMethod: string;

  constructor(private formBuilder: FormBuilder,private service:ApiService,private route: ActivatedRoute, private location: Location) {
    this.DROPDOWN_LIST = ['GET','POST','DELETE','PUT']
    this.DROPDOWN_LIST2 = [
      "string", "integer", "boolean"
    ]
    this.selectedRequestedMethod = '';
    this.receivedParamsTypes = [];
  }
  ngOnInit(): void {
    const groupID = this.route.snapshot.queryParamMap.get('groupID');
    this.endpointGroupID=groupID;
    const endpointID = this.route.snapshot.queryParamMap.get('endpointID');
    this.receivedEndpointID=endpointID
    this.getAvailableRespCodes()
    this.getEndpointDetail()
  }

  removevalue(i: number){
    this.params.splice(i,1);
  }

  cancel(){
    this.location.back()
  }

  isEditing(){
    return this.receivedEndpointID!=''
  }
  getEndpointDetail(){
    this.service.getEndpointbyID(this.receivedEndpointID).subscribe(resp=>{
      this.receivedEndpoint = resp[0];
      console.log("fallo y si se ejecuto")
      this.selectedRequestedMethod = this.receivedEndpoint.methodType;  //methodType assign to a local global variable for successful binding
    })
    this.service.getParamsbyEndpointID(this.receivedEndpointID).subscribe(resp=>{
      this.receivedParams = resp;
      if(this.isEditing()){
        this.fillParamsWithReceivedParams();
      }
      console.log(this.receivedParams);
    })
    this.service.getRespCodesbyEndpointID(this.receivedEndpointID).subscribe(resp=>{
      this.receivedRespCodes = resp;
    })
  }

  fillParamsWithReceivedParams(){
    this.params = []; //does empty params to filled from the received params
    this.receivedParams.forEach(element => {
        this.params.push({paramName: element.paramName, dataType: element.dataType, paramDescription: element.paramDescription});
        this.receivedParamsTypes.push(element.dataType);
    })
    console.log("Here it comes");
    console.log(this.params);
    console.log(this.receivedParamsTypes);
  }


  addvalue(){
    this.params.push({paramName: "", dataType: "", paramDescription: ""});
    console.log(this.addEndpointForm.value.responses)
  }

  getAvailableRespCodes(){
    this.service.getAllRespCodes().subscribe(data=>{
      this.respCodes = data;
    })
  }

  createEndpoint(){
    this.endpoint = {
      name : this.addEndpointForm.value.name,
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
}
