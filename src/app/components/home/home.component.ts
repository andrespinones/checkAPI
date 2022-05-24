import { Component, OnInit} from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { AzureAdDemoService } from 'src/app/services/azure-ad-demo.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile?:Profile
  user = localStorage.getItem('currentUser');
  currentUser?: User;
  constructor(private azureService: AzureAdDemoService) { 
  }

  ngOnInit(): void {
    //prueba de que si se puede mandar a llamar al localstorage desde cualquier componente con su key
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  }

  getProfile(){
    this.azureService.getUserProfile().subscribe(profileInfo =>{
      this.profile = profileInfo;
    })
  }

}

