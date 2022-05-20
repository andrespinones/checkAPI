import { NewEndpointComponent } from './components/new-endpoint/new-endpoint.component';
import { NewApiComponent } from './components/new-api/new-api.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategorySidebarComponent } from './components/shared/category-sidebar/category-sidebar.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },{
    path: 'api/detail',
    component: DetailedComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'addApi',
    component: NewApiComponent
  },
  {
    path: 'addEndpoint',
    component: NewEndpointComponent
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
