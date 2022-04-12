import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbMenuModule, NbCardModule, NbDatepickerModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { OwnerService } from './service/owner.service';
import { OwnerModule } from './pages/owner/owner.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbLayoutModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSidebarModule,
    HomeModule,
    OwnerModule,
    HttpClientModule
  ],
  providers: [
    NbSidebarService,
    OwnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
