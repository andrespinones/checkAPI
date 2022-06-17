import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Endpoint } from 'src/app/models/endpoint';
import { endpointSidebar } from 'src/app/models/endpointSidebar';
import { FormGroup } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})

export class GroupsComponent implements OnInit {

  @Output() outputToParent = new EventEmitter<number>();
  showForm: boolean = false;
  group: any;
  apiID:any;
  apiGroup:any;
  //lista sin info de la base de datos
  DROPDOWN_LIST: any[];

  groupForm = this.formBuilder.group({
    group: ''
  });

  constructor(private service:ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private popupService: DialogService) {
    this.DROPDOWN_LIST = []
  }
  selectedIndex: number = -3; //used to know which listed item is selected

  setIndex(index: number) {   //updates the selectedIndex given the index obtained from the (click) event
    this.selectedIndex = index;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.getGroups();
    this.selectedIndex = -1;
  }

  getGroups(){
    this.service.getGroupsByApiID(this.apiID).subscribe(resp=>{
      this.DROPDOWN_LIST=resp;
    });
  }

  createGroup(){
    this.apiGroup={
      apiID: this.apiID,
      name: this.group
    }
    this.service.addApiGroup(this.apiGroup).subscribe();
  }
  

  onEdit() {
    this.showForm = !this.showForm;
  }

  update() {
    this.createGroup();
    this.groupForm.reset();
    this.ngOnInit();//refresh de la sidebar para que ya salga el nuevo grupo 
  }

  sendGroupID(group:any){
    this.outputToParent.emit(group);
  }

  calculateClasses(stateFlag: boolean){ //if the stateFlag is true activates the ~item-active class
    return {
      'list-group-item': true,
      'list-group-item-active': stateFlag
    };
  }
  deleteGroup(groupID:number, index:number){
    this.DROPDOWN_LIST.splice(index,1);
    this.service.deleteGroup(groupID).subscribe();
  }

  confirmDeleteGroup(groupID: number, index:number){
    this.popupService.openConfirmaDialog("Are you sure you want to delete this group? \n Once deleted you can not undo this action.")
    .afterClosed().subscribe(resp => {
      if(resp){
        this.deleteGroup(groupID,index);
      }
    })
  }
}