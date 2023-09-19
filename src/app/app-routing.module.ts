import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { LoadersComponent } from './loaders/loaders.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'selection', component: SelectionPageComponent },
  { path: 'loaders/:id/:duration', component: LoadersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
