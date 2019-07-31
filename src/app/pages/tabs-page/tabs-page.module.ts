import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { SpaceModule } from '../space/space.module';
import { ShoppingListPageModule } from '../shopping-list/shopping-list.module';
import { AccountModule } from '../account/account.module';
import { AddItemPageModule } from '../add-item/add-item.module';

@NgModule({
  imports: [
    SpaceModule,
    CommonModule,
    IonicModule,
    TabsPageRoutingModule,
    AccountModule,
    AddItemPageModule,
    ShoppingListPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
