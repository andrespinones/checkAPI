import { Component, Input, OnInit} from '@angular/core';
import { Endpoint } from 'src/app/models/endpoint';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Api } from 'src/app/models/apis';
import { Parameter } from 'src/app/models/parameter';


@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})

export class DetailedComponent  implements OnInit{
  receivedEndpoint!:Endpoint[];
  receivedParams!:Parameter[];
  endpointID!:number;
  apiData!:Api[];
  apiID:any;
  constructor(private service:ApiService, private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.apiID=id;
    this.getApi();
    this.getOutputEndpointID;
  }
  getApi(){
    this.service.getApibyID(this.apiID).subscribe(resp=>{
      this.apiData = resp;
      console.log(this.apiData)
    });
  }
  getEndpointDetail(endpointId:number){
        this.service.getEndpointbyID(endpointId).subscribe(resp=>{
          this.receivedEndpoint = resp;
        })
        this.service.getParamsbyEndpointID(endpointId).subscribe(resp=>{
          this.receivedParams = resp;
          console.log(this.receivedParams);
        })
  }
  getOutputEndpointID(received:any){
    this.endpointID=received;
    this.getEndpointDetail(this.endpointID)
  }
}

export class RespCode {
  num: Number | undefined;
  description!: string;
}
