import { Component, OnInit } from '@angular/core';


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

  constructor() {
    
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
  ngOnInit(): void {
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
