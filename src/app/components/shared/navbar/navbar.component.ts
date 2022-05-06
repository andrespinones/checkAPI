import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdDemoService } from 'src/app/azure-ad-demo.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private readonly _destroy=new Subject<void>();
    isUserLoggedIn: boolean = false;
    profile:Profile = {} as Profile;
    constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig:MsalGuardConfiguration,
    private msalBroadCastService:MsalBroadcastService,
    private authService:MsalService,private azureService:AzureAdDemoService) { }

    ngOnInit(): void {
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
}
