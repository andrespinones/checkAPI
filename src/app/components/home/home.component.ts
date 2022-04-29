import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AzureAdDemoService } from 'src/app/azure-ad-demo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile?:Profile
  constructor(private azureService: AzureAdDemoService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getToken();
  }

  getProfile(){
    this.azureService.getUserProfile().subscribe(profileInfo =>{
      this.profile = profileInfo;
    })
  }

  getToken(){
  }

}
