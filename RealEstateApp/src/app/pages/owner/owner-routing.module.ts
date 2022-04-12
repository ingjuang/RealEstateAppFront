import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { OwnerComponent } from './owner.component';

const routes: Routes = [
  { path: 'owner-form', component: OwnerFormComponent },
  { path: 'owner-form/:idOwner', component: OwnerFormComponent },
  { path: '', component: OwnerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {}
