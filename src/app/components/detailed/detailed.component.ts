import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Endpoint } from 'src/app/models/endpoint';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Api } from 'src/app/models/apis';
import { Parameter } from 'src/app/models/parameter';
import { Apitester } from 'src/app/services/apitester.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';


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
  receivedParams!:Parameter[];
  endpointID!:number;
  api!:Api;
  apiID:any;
  path:string = "";
  //api testing
  endpoint: string;
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

    text : string = "";  //works with the original enpoint path
    actualText: string = this.text;

  queryParams: any = [] //to concatenete with endpoint path when fulfilled
  paramMap = new Map<string, any>();

  constructor(private service:ApiService, private route: ActivatedRoute, private _mainService: Apitester, private formBuilder:FormBuilder) {
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
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.getApi();
    this.getOutputEndpointID;
    this.responseTime = 0;
  }
  getApi(){
    this.service.getApibyID(this.apiID).subscribe(resp=>{
      this.api = resp[0];
    });
  }

  addQueryValue(paramName: string){  //to push an empty item to be binded later on html input
    this.queryParams.push({[paramName]: ''});
    this.paramMap.set(paramName, '');
  }

  printQueryParams(){
    // for(let i = 0; i<this.queryParams.length; i++){
    //   console.log(this.queryParams[i]);
    // }
    console.log(this.queryParams);
  }

  getEndpointDetail(endpointId:number){
        this.service.getEndpointbyID(endpointId).subscribe(resp=>{
          this.receivedEndpoint = resp[0];
          this.selectedRequestMethod = this.receivedEndpoint.methodType;
          this.path = this.receivedEndpoint.path;
          document.getElementById("endPath")!.innerHTML = this.path;
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
        })
  }
  getOutputEndpointID(received:number){
    this.endpointID=received;
    this.getEndpointDetail(this.endpointID)
  }

  didBindParam(paramName: string){
    this.text = this.receivedEndpoint.path;
    this.actualText = this.text;
    for(const [key,value] of this.paramMap){
      console.log(key)
      this.actualText = this.actualText.replace("{"+ key + "}", value)
    }
    // for(let i = 0; i<=this.paramMap.size; i ++){
    //   try{
    //     this.actualText = document.getElementById("endPath")!.innerHTML = this.actualText.replace("{" + this.paramMap. + "}", this.queryParams[i][paramName]);
    //   }
    //   catch(error){
    //     console.log("never gonna throw this error");
    //   }
    // }
    document.getElementById("endPath")!.innerHTML = this.actualText; //to bring all replacements of multiple parameters
    this.endpoint = this.api.baseUrl + this.actualText;
    console.log(this.endpoint);
  }

  //fromSource
  addItem(ctx: string) {
    let context;
    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
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
    console.log(this.stringForm.value);
    this.requestBody.forEach((item: number, index: string | number) => {
      if (this.requestBodyDataTypes[index] === 'Number') {
        item = Number(item);
      }
    });

    this.loadingState = true;
    const startTime = new Date().getTime();
    switch (this.selectedRequestMethod) {
      case 'GET': {
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
          },
          error => {
            this.loadingState = false;
            this.responseError = JSON.stringify(error, undefined, 4);
          }
        );
        break;
      }
      case 'POST': {
        this._mainService.sendPostRequest(
          this.endpoint,
          this.constructObject('Body'),
          this.constructObject('Headers')
        ).subscribe(
          data => {
            this.loadingState = false;
            this.responseData = JSON.stringify(data, undefined, 4);
          },
          error => {
            this.loadingState = false;
            this.responseError = JSON.stringify(error, undefined, 4);
          }
        );
        break;
      }
    }

    //this.saveRequest(this.selectedRequestMethod);
    this.newRequest.emit();
    this.stringForm.reset();
    this.integerForm.reset();
    this.text = this.receivedEndpoint.path
    document.getElementById("endPath")!.innerHTML = this.text;
    this.selectedRequestMethod = 'GET';
    this.endpoint = '';
    this.requestBody = [{ key: '', value: '' }];
    this.requestBodyDataTypes = [''];
    this.requestHeaders = [{ key: 'Content-Type', value: 'application/json' }];
    this.endpointError = '';
  }
}



export class RespCode {
  num: Number | undefined;
  description!: string;
}

