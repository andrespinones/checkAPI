import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { LoginComponent } from './components/login/login.component';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Authority } from '@azure/msal-common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatList, MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AzureAdDemoService } from './azure-ad-demo.service';
import { HomeComponent } from './components/home/home.component';

//import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'6756abad-ec34-4f13-8292-bb2ccda843b4',
            redirectUri:'http://localhost:4200/home',
            authority:'https://login.microsoftonline.com/c65a3ea6-0f7c-400b-8934-5a6dc1705645'
          },
          cache:
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:false
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType:InteractionType.Redirect,
        protectedResourceMap:new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.Read']],
            ['localhost',['api://apiUri/api.scope']]
          ]
        )
      }
      )
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },MsalGuard,AzureAdDemoService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
