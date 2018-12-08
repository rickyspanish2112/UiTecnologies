import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {NgxMaskModule} from 'ngx-mask';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { CrmaccountmanagerComponent } from './crmaccountmanager/crmaccountmanager.component';

const routes: Routes = [
  { path: 'crmaccountmanager',
   loadChildren: './crmaccountmanager/crmaccountmanager.module#CrmaccountmanagerModule' }, // Lazy loading of account manager module
  { path: 'demo', loadChildren: './demo/demo.module#DemoModule' }, // Lazy loading of demo module
  { path: '**', redirectTo: 'crmaccountmanager' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
