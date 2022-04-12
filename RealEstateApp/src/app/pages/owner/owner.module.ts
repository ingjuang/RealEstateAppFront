import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { NbAlertModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OwnerComponent,
    OwnerFormComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbAlertModule
  ]
})
export class OwnerModule { }
