import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SpacePage } from './space.page';
import { SpacePageRoutingModule } from './space-routing-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpacePageRoutingModule
  ],
  declarations: [SpacePage]
})
export class SpaceModule { }
