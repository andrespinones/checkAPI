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


  showForm: boolean = false;
  group: any;
  //lista sin info de la base de datos
  DROPDOWN_LIST: string[];

  groupForm = this.formBuilder.group({
    group: ''
  });


  constructor(private formBuilder: FormBuilder) {
    this.DROPDOWN_LIST = [
      "Pet", "Srtore", "User"
    ]
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');

  }



  onEdit() {
    this.showForm = !this.showForm;
  }

  update() {
    //recibe el valor del input - group - nombre del grupo
    console.log("Ya sirve el enter ", this.group)
    this.groupForm.reset();
    //falta que mande llamar la funcion que agrega el grupo a la bd 
    //hacer un refresh de la sidebar para que ya salaga el nuevo grupo 
  }



  // @Output() outputToParent = new EventEmitter<Endpoint>();
  // constructor(private service:ApiService, private route: ActivatedRoute) { }
  // endpoint:Endpoint = {} as Endpoint;
  // testList:any[]=[];
  // grouped: { [key: string]: endpointSidebar[] } = {};
  // apiID: any;
  // ngOnInit(): void {
  //   const id = this.route.snapshot.queryParamMap.get('id');
  //   this.apiID=id;
  //   this.getGroups();
  // }
  // getGroups(){
  //   this.service.getGroupsbyID(this.apiID).subscribe(resp=>{
  //     this.testList = resp;
  //     console.log(this.testList)
  //     this.grouped = this.testList.reduce((group, current)=> {
  //       //create your grouping key, by which you want to group the items
  //       const groupingKey = `${current.name}`;
  //       //if the group does not yet have an entry for this key, init it to empty array
  //       group[groupingKey] = group[groupingKey] || [];
  //       //add the current item to the group
  //       group[groupingKey].push(current);
  //       return group;
  //       }, {} ) 
  //   })
  // }

  // getEndpointDetail(endpointId:number){
  //   this.service.getEndpointbyID(endpointId).subscribe(resp=>{
  //     this.endpoint = resp;
  //     this.outputToParent.emit(this.endpoint)
  //   })
  // }
}