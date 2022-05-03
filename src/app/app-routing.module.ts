import { DetailedComponent } from './components/detailed/detailed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategorySidebarComponent } from './components/shared/category-sidebar/category-sidebar.component';


export const routes: Routes = [
  { path: 'home', component: CategorySidebarComponent },
  { path: 'detailed', component: DetailedComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }, 
  { path: '**', pathMatch: 'full', redirectTo: 'home' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
