import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpacePage } from './space.page';


const routes: Routes = [
  {
    path: '',
    component: SpacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SpacePageRoutingModule { }
