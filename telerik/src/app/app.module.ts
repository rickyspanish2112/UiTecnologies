import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { FormsModule } from '@angular/forms';

import { DeclarationComponent } from './declaration/declaration.component';
import { HomeComponent } from './home/home.component';
import { GridModule } from '@progress/kendo-angular-grid';
import {LabelModule} from '@progress/kendo-angular-label';
import {LayoutModule} from '@progress/kendo-angular-layout';




const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'declaration', component: DeclarationComponent},
  {path: '**', component:DeclarationComponent} //make this the default
 
];




@NgModule({
  declarations: [
    AppComponent,
    DeclarationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    BrowserAnimationsModule,
    InputsModule,
    DropDownsModule,
    DialogsModule,
    DateInputsModule,
    LabelModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),
    GridModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
