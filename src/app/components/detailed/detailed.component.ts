import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})

export class DetailedComponent  {

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
  respCode1 = 200;
  respDesc1 = "Successful Operation";
}
