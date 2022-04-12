import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbAlertModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbTreeGridModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyFormComponent } from './property-form/property-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    PropertyFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbLayoutModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbAlertModule,
    NbSelectModule
  ]
})
export class HomeModule { }
