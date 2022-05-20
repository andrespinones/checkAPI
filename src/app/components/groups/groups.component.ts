import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
// import { endpointSidebar } from 'src/app/models/endpointSidebar';
// import { Endpoint } from 'src/app/models/endpoint';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent  {
//   @Output() outputToParent = new EventEmitter<Endpoint>();
//   constructor(private service:ApiService, private route: ActivatedRoute) { }
//   endpoint:Endpoint = {} as Endpoint;
//   testList:any[]=[];
//   grouped: { [key: string]: endpointSidebar[] } = {};
//   apiID: any;
//   ngOnInit(): void {
//     const id = this.route.snapshot.queryParamMap.get('id');
//     this.apiID=id;
//     this.getGroups();
//   }
//   getGroups(){
//     this.service.getGroupsbyID(this.apiID).subscribe(resp=>{
//       this.testList = resp;
//       console.log(this.testList)
//       this.grouped = this.testList.reduce((group, current)=> {
//         //create your grouping key, by which you want to group the items
//         const groupingKey = `${current.name}`;
//         //if the group does not yet have an entry for this key, init it to empty array
//         group[groupingKey] = group[groupingKey] || [];
//         //add the current item to the group
//         group[groupingKey].push(current);
//         return group;
//         }, {} ) 
//     })
//   }

//   getEndpointDetail(endpointId:number){
//     this.service.getEndpointbyID(endpointId).subscribe(resp=>{
//       this.endpoint = resp;
//       this.outputToParent.emit(this.endpoint)
//     })
// }
}