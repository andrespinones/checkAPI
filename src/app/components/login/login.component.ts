import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdDemoService } from 'src/app/services/azure-ad-demo.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Profile } from 'src/app/models/profile';
import { AuthResponseData } from 'src/app/auth-response-data';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  response?: AuthResponseData;
  profile?:Profile;
  private readonly _destroy=new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig:MsalGuardConfiguration,
  private msalBroadCastService:MsalBroadcastService,
  private authService:MsalService, private azureAdDemoSerice:AzureAdDemoService,private router:Router, private aService:AuthService) { }

  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe
    (filter((interactionStatus:InteractionStatus)=>
    interactionStatus==InteractionStatus.None),
    takeUntil(this._destroy))
    .subscribe(x=>
      {
        this.isUserLoggedIn=this.authService.instance.getAllAccounts().length>0
        this.azureAdDemoSerice.isUserLoggedIn.next(this.isUserLoggedIn);
        if(this.isUserLoggedIn){
          //comparar servicio de auth con servicio de azure auth 
          //que el usuario de azure active directory exista en la base de datos, si SI, mandar el token y redireccionar
            this.azureAdDemoSerice.getUserProfile().subscribe(profileInfo =>{
            this.profile = profileInfo;
            this.silentLogin(this.profile.mail)
            })
            //checar donde se debe hacer el redirect
          this.router.navigateByUrl('home')
        }
      })
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login()
  {
    if(this.msalGuardConfig.authRequest)
    {
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as RedirectRequest)
    }
    else
    {
      this.authService.loginPopup();
    }
  }
  
  logout()
  {
    this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogoutUrl});
    localStorage.clear();
  }

  silentLogin(email:string){
    this.aService.silentLogin(email).subscribe(resp => {
      this.response = resp;
      this.aService.handleUser(this.response)
    })
  }

}

