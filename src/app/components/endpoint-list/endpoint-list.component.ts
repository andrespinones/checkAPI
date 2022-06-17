import { Endpoint } from './../../models/endpoint';
import { Component, OnInit, Output,EventEmitter, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { endpointSidebar } from 'src/app/models/endpointSidebar';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Router } from '@angular/router';


@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css']
})
export class EndpointListComponent implements OnInit {

  // lista de los EP traidos del grupo seleccionado en la sb
  DROPDOWN_LIST: Endpoint[];

  apiname = "Petstore";
  apibaseUrl = "pestore.api"

  @Output() outputToParent = new EventEmitter<Endpoint>();
  constructor(private service:ApiService, private route: ActivatedRoute, private focusMonitor: FocusMonitor, private router: Router) { 
    this.DROPDOWN_LIST = []
  }

  group: any;
  endpoint:Endpoint = {} as Endpoint;
  testList:any[]=[];
  grouped: { [key: string]: endpointSidebar[] } = {};
  apiID: any;
  apiData:any;
  receivedGroupID!:number;
  showF: boolean = true;
  showL: boolean = false;


  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.getApi();
    this.getOutputGroup;
  }

  addEndpointRedirect(groupID: number) {
    let route = '/addEndpoint';
    this.router.navigate([route], { queryParams: { groupID: groupID } });
  }

  editEndpointRedirect(endpointID:number){
    let route = '/editEndpoint';
    this.router.navigate([route], { queryParams: { endpointID: endpointID} });
  }

  getApi(){
    this.service.getApibyID(this.apiID).subscribe(resp=>{
      this.apiData = resp[0];
    });
  }

  getOutputGroup(received:any){
    this.group = received;
    this.receivedGroupID=this.group.groupID;
    console.log(this.receivedGroupID);
    this.getEndpoints(this.receivedGroupID);
    this.showF = false;
  }

  getEndpoints(groupID:any){
    this.service.getEndpointsByGroupID(groupID).subscribe(resp=>{
      this.DROPDOWN_LIST = resp;
      if (this.DROPDOWN_LIST.length === 0){
        this.showL = true;
        this.showF = false;
      }else{
        this.showF = false;
        this.showL = false;
      }
    })
  }
  deleteEndpoint(endpointID:number,index:number){
    this.DROPDOWN_LIST.splice(index,1);
    this.service.deleteEndpoint(endpointID).subscribe();
  }
}
