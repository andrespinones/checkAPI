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
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';

//Navbar
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';

// import { MatSidenavContainer } from '@angular/material/sidenav';
import { CategorySidebarComponent } from './components/shared/category-sidebar/category-sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NewApiComponent } from './components/new-api/new-api.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// userList imports
import { UserListComponent } from './components/user-list/user-list.component';
import { EndpointSidebarComponent } from './components/endpoint-sidebar/endpoint-sidebar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
//primeng imports ()


//search bar functionality in user list table
import { GroupsComponent } from './components/groups/groups.component';
import { NewEndpointComponent } from './components/new-endpoint/new-endpoint.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';

//overlay for addapi
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { EditEndpointComponent } from './components/edit-endpoint/edit-endpoint.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    LoginComponent,
    HomeComponent,
    CategorySidebarComponent,
    NavbarComponent,
    DetailedComponent,
    UserListComponent,
    EndpointSidebarComponent,
    NewApiComponent,
    GroupsComponent,
    NewEndpointComponent,
    EndpointListComponent,
    ConfirmDialogComponent,
    EditEndpointComponent,
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
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    OverlayModule,
    A11yModule,

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
            storeAuthStateInCookie:true
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
            ['localhost',[]]
          ]
        )
      }
      ),
  ],
  providers: [

    {
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true

  },AzureAdDemoService],
  bootstrap: [AppComponent,MsalRedirectComponent],
  entryComponents:[ConfirmDialogComponent]
})
export class AppModule { }


