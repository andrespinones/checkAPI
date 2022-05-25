import { GroupsComponent } from './components/groups/groups.component';
import { EndpointListComponent } from './components/endpoint-list/endpoint-list.component';
import { NewEndpointComponent } from './components/new-endpoint/new-endpoint.component'
import { NewApiComponent } from './components/new-api/new-api.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategorySidebarComponent } from './components/shared/category-sidebar/category-sidebar.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
  },{
    path: 'api/detail',
    component: DetailedComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin-users',
    component: UserListComponent,
  },
  {
    path: 'addApi',
    component: NewApiComponent
  },
  {
    path: 'endpoints', 
    component: EndpointListComponent

  },
  {
    path: 'addEndpoint',
    component: NewEndpointComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin-users',
    component: UserListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      initialNavigation:'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
