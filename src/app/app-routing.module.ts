import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicGridComponent } from './basic-grid/basic-grid.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [{ path: '', redirectTo: 'basic-grid', pathMatch: 'full' }, //default route
{ path: 'basic-grid', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
