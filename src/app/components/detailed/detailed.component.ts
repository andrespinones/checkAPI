import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from 'src/app/models/apis';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})

export class DetailedComponent  implements OnInit{

  nombreApi = "Petstore";
  baseURL = "https://petstore.checapi.io/v2";
  tagName = "pet";
  mType = "get";
  path = "/pet/{petID}"
  epDesc ="Returns a single pet";
  lastResp = 200;

  /* Parametros del endPoint */
  paramType = "integer($int64)";
  paramName = "petID";
  isRequired = true;
  paramDescription = "Id of pet to return";
  
  
  //Response Codes

  respCode: RespCode;
  respCodes: RespCode[];

  //json de respuesta 
  pet: Pet;

  pets: Pet[];
  apiID: any;
  constructor(private service:ApiService, private route: ActivatedRoute) {
    
    this.pet = { id: 1, name: "doggie", photoURLs: "photo." };
    
    this.pets = [
      {
        id: 1,
        name: "doggie",
        photoURLs: "photo1.jpg"
      }
    ];

    this.respCode = { num: 200, description: "Successful Operation" };
    this.respCodes = [
      {
        num: 400,
        description: "Successful Operation" 
      },
      {
      num: 500,
        description: "Successful Operation" 
      }
    ];
  }
  
  testList:any[]=[];
  grouped:any
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
        console.log(this.grouped)
    })
  }
}

export class Pet {
  id: Number | undefined;
  name!: string;
  photoURLs!: string;
}

export class RespCode {
  num: Number | undefined;
  description!: string;
}
