import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Endpoint } from 'src/app/models/endpoint';
import { endpointSidebar } from 'src/app/models/endpointSidebar';
import { FormGroup } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';



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

  constructor(private service:ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.DROPDOWN_LIST = []
  }
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.getGroups();
    throw new Error('Method not implemented.');
  }

  getGroups(){
    this.service.getGroupsByApiID(this.apiID).subscribe(resp=>{
      this.DROPDOWN_LIST=resp;
      console.log(this.DROPDOWN_LIST);
    });
  }

  createGroup(){
    this.apiGroup={
      apiID: this.apiID,
      name: this.group
    }
    console.log(this.apiGroup);
    this.service.addApiGroup(this.apiGroup).subscribe()
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
}