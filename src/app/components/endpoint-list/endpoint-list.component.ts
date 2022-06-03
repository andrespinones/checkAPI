import { Endpoint } from './../../models/endpoint';
import { Component, OnInit, Output,EventEmitter, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { endpointSidebar } from 'src/app/models/endpointSidebar';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkConnectedOverlay} from '@angular/cdk/overlay';
import {map, filter, startWith, switchMap, delay, mapTo} from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
// import { Endpoint } from 'src/app/models/endpoint';

@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css']
})
export class EndpointListComponent implements OnInit {

  // prueba con lista local de tipo EP
  DROPDOWN_LIST: EP[];

  apiname = "Petstore";
  apibaseUrl = "pestore.api"

  showPanel$: boolean =true;
  @ViewChild(CdkConnectedOverlay, {static: true})
  private connectedOverlay = CdkConnectedOverlay;

  isPanelVisible: boolean = false;
  private isPanelHidden: boolean = false;
  // private isPanelHidden$: Observable<boolean>;


  @Output() outputToParent = new EventEmitter<Endpoint>();
  constructor(private service:ApiService, private route: ActivatedRoute, private focusMonitor: FocusMonitor) { 
    this.DROPDOWN_LIST = [
      // {type: "GET", path: "/pet/{petID}"},
      // {type: "POST", path: "/pet"},
      // {type: "DELETE", path: "/pet/{petID}"},
      // {type: "PUT", path: "/pet"}
    ]
  }


  //función del overlay 


  endpoint:Endpoint = {} as Endpoint;
  testList:any[]=[];
  grouped: { [key: string]: endpointSidebar[] } = {};
  apiID: any;

  toggleDropdown(){
    this.showPanel$ = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.isPanelVisible = true;

  }
}

export class EP{
  type: string | undefined; 
  path: string | undefined;
}
