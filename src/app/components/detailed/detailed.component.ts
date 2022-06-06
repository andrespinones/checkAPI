import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Endpoint } from 'src/app/models/endpoint';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Api } from 'src/app/models/apis';
import { Parameter } from 'src/app/models/parameter';
import { Apitester } from 'src/app/services/apitester.service';


@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})

export class DetailedComponent  implements OnInit{
  @Input() openIDBrequest: any;
  @Input() indexedDB: any;
  @Output() newRequest = new EventEmitter();

  receivedEndpoint!:Endpoint;
  receivedParams!:Parameter[];
  endpointID!:number;
  apiData!:Api[];
  apiID:any;
  //api testing 
  endpoint: string;
  selectedRequestMethod: string;
  readonly requestMethods: Array<string>;
  responseData: any;
  responseError: any;
  savedRequestCount!: number;
  requestBody: any;
  requestBodyDataTypes: any;
  readonly availableDataTypes: any;
  requestHeaders: any;
  endpointError: string;
  loadingState: boolean;
  constructor(private service:ApiService, private route: ActivatedRoute, private _mainService: Apitester) {
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
  }
  getApi(){
    this.service.getApibyID(this.apiID).subscribe(resp=>{
      this.apiData = resp;
    });
  }

  getEndpointDetail(endpointId:number){
        this.service.getEndpointbyID(endpointId).subscribe(resp=>{
          this.receivedEndpoint = resp[0];
        })
        this.service.getParamsbyEndpointID(endpointId).subscribe(resp=>{
          this.receivedParams = resp;
        })
  }
  getOutputEndpointID(received:number){
    this.endpointID=received;
    this.getEndpointDetail(this.endpointID)
  }

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

  saveRequest(requestType: string) {
    const requestObject = {
      endpoint: this.endpoint,
      method: this.selectedRequestMethod,
      headers: this.constructObject('Headers'),
      body: this.requestBody
    };
    if (requestType === 'POST') {
      requestObject['body'] = this.constructObject('Body');
    }
    const transaction = this.indexedDB.transaction('pastRequests', 'readwrite');

    const pastRequestsStore = transaction.objectStore('pastRequests');
    pastRequestsStore.add(requestObject);
  }

  loadPastRequest(request: any) {
    this.selectedRequestMethod = request.method;
    this.endpoint = request.endpoint;
    this.requestHeaders = this.deconstructObject(request.headers, 'Headers');
    if (request.method === 'POST') {
      this.requestBody = this.deconstructObject(request.body, 'Body');
    }
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

  sendRequest() {
    this.endpointError = '';
    this.responseData = '';
    this.responseError = '';

    if (!this.endpoint) {
      this.endpointError = 'Endpoint is a Required value';
      return;
    }
    if (!this.validateUrl(this.endpoint)) {
      this.endpointError = 'Please enter a valid URL';
      return;
    }

    this.requestBody.forEach((item: number, index: string | number) => {
      if (this.requestBodyDataTypes[index] === 'Number') {
        item = Number(item);
      }
    });

    this.loadingState = true;
    switch (this.selectedRequestMethod) {
      case 'GET': {
        this._mainService.sendGetRequest(
          this.endpoint,
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

    this.saveRequest(this.selectedRequestMethod);
    this.newRequest.emit();

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

