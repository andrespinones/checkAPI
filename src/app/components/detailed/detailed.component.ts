import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Endpoint } from 'src/app/models/endpoint';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/app/models/apis';
import { Parameter } from 'src/app/models/parameter';
import { Apitester } from 'src/app/services/apitester.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import { RespCode } from 'src/app/models/respCode';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/http.service';
import * as moment from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})


export class DetailedComponent  implements OnInit{
  stringFormControl = new FormControl('', [Validators.required]);
  integerFormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);

  @Input() openIDBrequest: any;
  @Input() indexedDB: any;
  @Output() newRequest = new EventEmitter();

  matcher = new MyErrorStateMatcher();
  stringForm = this.formBuilder.group({
    var: this.stringFormControl
  });
  integerForm = this.formBuilder.group({
    var: this.integerFormControl
  });
  receivedEndpoint!:Endpoint;
  respCode:string = "";
  responseCode!: RespCode;
  receivedParams!:Parameter[];
  receivedRespCodes!:RespCode[];
  endpointID!:number;
  api!:Api;
  apiID:any;
  path:string = "";
  //api testing
  endpoint: string;
  //traerse el user para saber si es admin o no
  currentUser?: User;
  displayedJson:string = '';
  selectedRequestMethod: string;
  readonly requestMethods: Array<string>;
  responseData: any;
  responseError: any;
  responseTime: any;
  savedRequestCount!: number;
  requestBody: any;
  requestBodyDataTypes: any;
  readonly availableDataTypes: any;
  requestHeaders: any;
  endpointError: string;
  loadingState: boolean;
  auxData:any;
  text : string = "";  //works with the original enpoint path
  actualText: string = this.text;

  queryParams: any = [] //to concatenete with endpoint path when fulfilled
  paramMap = new Map<string, any>();
  title = 'Article by Jeetendra';
  posts : any;
  dateMonthAsWord = '';
  sla: any;
  status: any;

  constructor(private service:ApiService, private route: ActivatedRoute, private _mainService: Apitester, private formBuilder:FormBuilder,  private router:Router, private httpService: HttpService) {

    this.endpoint = '';
    this.selectedRequestMethod = '';
    this.requestMethods = [
      'GET',
      'POST'
    ];
    this.availableDataTypes = [
      'String',
      'Number',
      'Boolean'
    ];

    this.requestBody = [{ key: '', value: '' }];
    this.requestBodyDataTypes = [''];
    this.requestHeaders = [{ key: 'Content-Type', value: 'application/json' }];
    this.endpointError = '';
    this.loadingState = false;
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.getApi();
    this.responseTime = 0;
  }

  getResponseCode(code:number){
    var result = this.receivedRespCodes.find(respCode => respCode.number === code);
    return result;
  }

  editEndpointRedirect(endpointID:number){
    let route = '/editEndpoint';
    this.router.navigate([route], { queryParams: { endpointID: endpointID} });
  }

  isAdmin(): boolean {
    if (this.currentUser?.role == "Admin") {
      return true;
    }
    else {
      return false;
    }
  }

  getApi(){
    this.service.getApibyID(this.apiID).subscribe(resp=>{
      this.api = resp[0];
      this.sla = this.getSLA(this.api.successAns,this.api.errorAns);
      this.status = this.getStatus();
    });
  }

  getStatus(){
    const total = this.api.successAns+this.api.errorAns;
    if ((this.api.successAns*100/total) > 60){
      return 'Online';
    }
    else{
      return 'Offline';
    }
  }

  getSLA(successAns:number,errorAns:number){
    const total = successAns+errorAns;
    return (successAns*100/total).toPrecision(2)+'%';
  }

  editRedirect() {
    let route = '/endpoints';
    this.router.navigate([route], { queryParams: { id: this.apiID } });
  }

  addQueryValue(paramName: string){  //to push an empty item to be binded later on html input
    this.queryParams.push({[paramName]: ''});
    this.paramMap.set(paramName, '');
  }


  printQueryParams(){
    console.log(this.queryParams);
  }

  getEndpointDetail(endpointId:number){
        this.service.getEndpointbyID(endpointId).subscribe(resp=>{
          this.receivedEndpoint = resp[0];
          this.selectedRequestMethod = this.receivedEndpoint.methodType;
          this.path = this.receivedEndpoint.path;
        })
        this.service.getParamsbyEndpointID(endpointId).subscribe(resp=>{
          this.receivedParams = resp;
          if(this.queryParams.length > 0){  //makes sure the array is not empty for new endpoint
            this.queryParams = [];
            this.paramMap.clear();
          }
          for(let receivedParam of this.receivedParams){  //iterates to add empty inputs items
            this.addQueryValue(receivedParam.paramName);
          }
          this.displayedJson = JSON.stringify(Object.fromEntries(this.paramMap), undefined, 4);
        })
        this.service.getRespCodesbyEndpointID(endpointId).subscribe(resp=>{
          this.receivedRespCodes = resp;
        })
  }
  getOutputEndpointID(received:number){
    console.log(received)
    this.endpointID=received;
    this.getEndpointDetail(this.endpointID)
  }

  didBindParam(paramName: string){
    this.text = this.receivedEndpoint.path;
    this.actualText = this.text;
    for(const [key,value] of this.paramMap){
      if(value == ''){
        this.actualText = this.actualText.replace("{"+ key + "}", "{"+ key + "}")

      }else{
        this.actualText = this.actualText.replace("{"+ key + "}", value)
      }
    }
    document.getElementById("endPath")!.innerHTML = this.actualText; //to bring all replacements of multiple parameters
    this.endpoint = this.api.baseUrl + this.actualText;
    console.log(this.endpoint);
  }

  jsonBind(){
    let current = JSON.stringify(Object.fromEntries(this.paramMap), undefined, 4);
    let isFilled = false;
    for (const value of this.paramMap.values()) {
      if (value == ""){
      }
      else{
        isFilled = true;
        break;
      }
    }
    if(isFilled){
      this.displayedJson = JSON.stringify(Object.fromEntries(this.paramMap), undefined, 4);
    }else{
      this.displayedJson = current;
    }
  }

  //fromSource
  addItem(ctx: string) {
    let context;
    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
      console.log(this.requestHeaders)
    }

    context.push({ key: '', value: '' });
    if (ctx === 'Body') {
      this.requestBodyDataTypes.push('');
    }
  }

  isAddDisabled(ctx: string) {
    let context;
    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
    }

    if (context.length > 0) {
      if (context[context.length - 1].key === '' ||
        context[context.length - 1].value === ''
      ) {
        return true;
      }
    }

    return false;
  }

  removeItem(index: number, ctx: string) {
    let context;
    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
    }

    context.splice(index, 1);
  }


  deconstructObject(object: any, type: string) {
    const objectArray: { key: string; value: any; }[] = [];

    switch (type) {
      case 'Body': {
        Object.keys(object).forEach((objKey, index) => {
          this.requestBodyDataTypes[index] = 'String';
          const obj = { key: objKey, value: '' };
          objectArray.push(obj);
        });
        break;
      }
      case 'Headers': {
        Object.keys(object).forEach(objKey => {
          const obj = { key: objKey, value: object[objKey] };
          objectArray.push(obj);
        });
        break;
      }
    }

    return objectArray;
  }

  validateUrl(text: string) {
    // tslint:disable-next-line: max-line-length
    const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return urlRegExp.test(text);
  }

  constructObject(ctx: string) {
    let context;
    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
    }

    let constructedObject = {};
    constructedObject
      = context
        .reduce((object: { [x: string]: any; }, item: { key: string | number; value: any; }) => {
          object[item.key] = item.value;
          return object;
        }, {});
    return constructedObject;
  }

  isFormValid(){
    return (this.stringForm.valid || this.integerForm.valid)
  }

  sendRequest() {
    this.endpointError = '';
    this.responseData = '';
    this.responseError = '';
    console.log(this.api.baseUrl);
    console.log(this.path);
    //TODO: hacer algo que valide que si es post o si no tiene parametros que el endpoint sea el baseurl mas el path.
    this.requestBody.forEach((item: number, index: string | number) => {
      if (this.requestBodyDataTypes[index] === 'Number') {
        item = Number(item);
      }
    });

    this.loadingState = true;
    const startTime = new Date().getTime();
    switch (this.selectedRequestMethod) {
      case 'GET': {
        console.log(JSON.stringify(Object.fromEntries(this.paramMap)));

        this._mainService.sendGetRequest(
          this.endpoint,
          this.constructObject('Headers')).subscribe(
          data => {
            this.loadingState = false;
            const endTime = new Date().getTime();
            const diff = (endTime - startTime)/1000 + 'Seconds';
            console.log(diff);
            this.responseTime = diff;
            this.responseData = JSON.stringify(data, undefined, 4);
            console.log(data.status);
            let x = data.status;
            this.respCode = x.toString();
            this.responseCode = this.getResponseCode(x)!;
            this.sendLastResp(x)
            this.service.getEndpointbyID(this.endpointID).subscribe(resp=>{
              this.receivedEndpoint = resp[0];
              this.selectedRequestMethod = this.receivedEndpoint.methodType;
              this.path = this.receivedEndpoint.path;
              if(x <= 210){
                this.slaCalculator(1);
              }else if(x >=500){
                this.slaCalculator(0);
              }
            })
          },
          error => {
            this.loadingState = false;
            this.responseError = JSON.stringify(error, undefined, 4);
            console.log(error.status)
            let x = error.status;
            this.respCode = x.toString();
            this.responseCode = this.getResponseCode(x)!;
            this.sendLastResp(x)
            this.service.getEndpointbyID(this.endpointID).subscribe(resp=>{
              this.receivedEndpoint = resp[0];
              this.selectedRequestMethod = this.receivedEndpoint.methodType;
              this.path = this.receivedEndpoint.path;
              if(x <= 210){
                this.slaCalculator(1);
              }else if(x >=500){
                this.slaCalculator(0);
              }
            })
          }
        );
        break;
      }
      case 'POST': {
        let string = JSON.stringify(Object.fromEntries(this.paramMap), undefined, 4);
        this.endpoint = this.api.baseUrl + this.path
        this._mainService.sendPostRequest(
          this.endpoint,
          string,
          this.constructObject('Headers')
        ).subscribe(
          data => {
            this.loadingState = false;
            const endTime = new Date().getTime();
            const diff = (endTime - startTime)/1000 + 'Seconds';
            console.log(diff);
            this.responseTime = diff;
            this.responseData = JSON.stringify(data, undefined, 4);
            console.log(data.status)
            let x = data.status;
            this.respCode = x.toString();
            this.responseCode = this.getResponseCode(x)!;
            this.sendLastResp(x)
            this.service.getEndpointbyID(this.endpointID).subscribe(resp=>{
              this.receivedEndpoint = resp[0];
              this.selectedRequestMethod = this.receivedEndpoint.methodType;
              this.path = this.receivedEndpoint.path;
              if(x <= 210){
                this.slaCalculator(1);
              }else if(x >=500){
                this.slaCalculator(0);
              }
            })
          },
          error => {
            this.loadingState = false;
            this.responseError = JSON.stringify(error, undefined, 4);
            console.log(error.status)
            let x = error.status;
            this.respCode = x.toString();
            this.responseCode = this.getResponseCode(x)!;
            this.sendLastResp(x)
            this.service.getEndpointbyID(this.endpointID).subscribe(resp=>{
              this.receivedEndpoint = resp[0];
              this.selectedRequestMethod = this.receivedEndpoint.methodType;
              this.path = this.receivedEndpoint.path;
              if(x <= 210){
                this.slaCalculator(1);
              }else if(x >=500){
                this.slaCalculator(0);
              }
            })
          }
        );
        break;
      }
    }
    this.newRequest.emit();
    this.stringForm.reset();
    this.integerForm.reset();
    this.text = this.receivedEndpoint.path
    document.getElementById("endPath")!.innerHTML = this.text;
    this.endpoint = '';
    this.requestBody = [{ key: '', value: '' }];
    this.requestBodyDataTypes = [''];
    this.requestHeaders = this.requestHeaders;
    this.endpointError = '';
  }

  sendLastResp(respCode:number){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var dateTime = date;
     this.dateMonthAsWord = moment(dateTime, "YYYY-MM-DD").fromNow();
    const body = {
      lastRespCode: respCode,
      lastRespDate: dateTime
    }
    this.service.updateEndpointLastResp(this.endpointID,body).subscribe();
  }

  slaCalculator(bit:number){
    const body ={
      didSucceed: bit,
    }
    this.service.updateAPIinfoSLA(this.apiID, body).subscribe();
  }
}


