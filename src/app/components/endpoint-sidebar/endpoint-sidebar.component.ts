import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { endpointSidebar } from 'src/app/models/endpointSidebar';

@Component({
  selector: 'app-endpoint-sidebar',
  templateUrl: './endpoint-sidebar.component.html',
  styleUrls: ['./endpoint-sidebar.component.css']
})

export class EndpointSidebarComponent implements OnInit {
  @Output() outputToParent = new EventEmitter<number>();
  constructor(private service:ApiService, private route: ActivatedRoute) { }

  selectedIndex: number = -3; //used to know which listed item is selected

  setIndex(index: number) {   //updates the selectedIndex given the index obtained from the (click) event
    this.selectedIndex = index;
  }

  testList:any[]=[];
  grouped: { [key: string]: endpointSidebar[] } = {};
  apiID: any;
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.getGroups();
  }

  getGroups(){
    this.service.getGroupsbyID(this.apiID).subscribe(resp=>{
      this.testList = resp;
      console.log(this.testList)
      this.grouped = this.testList.reduce((group, current)=> {
        //create your grouping key, by which you want to group the items
        const groupingKey = `${current.name}`;
        //if the group does not yet have an entry for this key, init it to empty array
        group[groupingKey] = group[groupingKey] || [];
        //add the current item to the group
        group[groupingKey].push(current);
        return group;
        }, {} )
    })
  }

  getEndpointDetail(endpointId:number){
    this.outputToParent.emit(endpointId);
  }

  calculateClasses(stateFlag: boolean){ //if the stateFlag is true activates the ~item-active class
    return {
      'list-group-item': true,
      'list-group-item-active': stateFlag
    };
  }
}
