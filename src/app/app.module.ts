import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//MSAL-services
import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Authority } from '@azure/msal-common';
//MSAL Services
import { AzureAdDemoService } from './services/azure-ad-demo.service';
//Components Imports
import { AppComponent } from './app.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { LoginComponent } from './components/login/login.component';
import { CardComponent } from './components/card/card.component';
import { DetailedComponent } from './components/detailed/detailed.component';
//Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';

//Navbar
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSidenavContainer } from '@angular/material/sidenav';
import { CategorySidebarComponent } from './components/shared/category-sidebar/category-sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// userList imports
import { UserListComponent } from './components/user-list/user-list.component';
import { EndpointSidebarComponent } from './components/endpoint-sidebar/endpoint-sidebar.component';
//primeng imports ()


//search bar functionality in user list table
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    LoginComponent,
    HomeComponent,
    CategorySidebarComponent,
    NavbarComponent,
    CardComponent,
    DetailedComponent,
    CardComponent,
    UserListComponent,
    EndpointSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'6756abad-ec34-4f13-8292-bb2ccda843b4',
            redirectUri:'http://localhost:4200',
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
      ),
    MatPaginatorModule,
    FormsModule,
    MatInputModule
  ],
  providers: [CardComponent,{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },MsalGuard,AzureAdDemoService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
