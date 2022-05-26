import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdDemoService } from 'src/app/services/azure-ad-demo.service';
import { Profile } from 'src/app/models/profile';
import { ApiService } from 'src/app/services/api.service';
import { Api } from 'src/app/models/apis';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser?:User;
    private readonly _destroy=new Subject<void>();
    isUserLoggedIn: boolean = false;
    profile:Profile = {} as Profile;
    ApiList:Api[]=[];
    api!: Api
    myControl = new FormControl(this.api);
    options: Api[] = [];
    userImage = './assets/images/logo.png';
    adminImage = './assets/images/checkapiAdmin.svg';
    constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig:MsalGuardConfiguration,
    private msalBroadCastService:MsalBroadcastService,
    private authService:MsalService,private azureService:AzureAdDemoService,private apis:ApiService,
    private router:Router) { }

    ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.msalBroadCastService.inProgress$.pipe
      (filter((interactionStatus:InteractionStatus)=>
      interactionStatus==InteractionStatus.None),
      takeUntil(this._destroy))
      .subscribe(x=>
        {
          this.isUserLoggedIn=this.authService.instance.getAllAccounts().length>0
          this.azureService.isUserLoggedIn.next(this.isUserLoggedIn);
        })
        this.getProfile();
        this.refreshApis();

    }

    logout()
    {
      this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogoutUrl});
    }

    getProfile(){
      this.azureService.getUserProfile().subscribe(profileInfo =>{
        this.profile = profileInfo;
      })
    }

    refreshApis(){
      this.apis.getAllApis().subscribe(resp=>{
        this.ApiList = resp;
        console.log(this.ApiList)
        this.options = this.ApiList;
      });
    }

    isAdmin(): boolean{
      if(this.currentUser?.role == "Admin"){
        return true;
      }
      else{
        return false;
      }
    }

}
