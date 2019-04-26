import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComMaterialModule } from './com-material/com-material.module';
import { ConditionComponent } from './condition/condition.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ConditionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComMaterialModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
