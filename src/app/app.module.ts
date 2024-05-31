import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridAngular } from 'ag-grid-angular';
import { BasicGridComponent } from './basic-grid/basic-grid.component';
import { CellButtonComponent } from './basic-grid/cell-button/cell-button.component';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridComponent } from './data-grid/data-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicGridComponent,
    CellButtonComponent,
    TestComponent,
    DataGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridAngular,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [KeyValuePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
