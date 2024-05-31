import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicGridComponent } from './basic-grid/basic-grid.component';
import { TestComponent } from './test/test.component';
import { DataGridComponent } from './data-grid/data-grid.component';

const routes: Routes = [{ path: '', redirectTo: 'data-grid', pathMatch: 'full' }, //default route
{ path: 'test-grid', component: TestComponent },
{ path: 'basic-grid', component: TestComponent },
{ path: 'data-grid', component: BasicGridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
