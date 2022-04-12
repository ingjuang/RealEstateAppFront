import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PropertyFormComponent } from './property-form/property-form.component';

const routes: Routes = [
  {path: 'property-form', component: PropertyFormComponent},
  {path: 'property-form/:idProperty', component: PropertyFormComponent},
  { path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
