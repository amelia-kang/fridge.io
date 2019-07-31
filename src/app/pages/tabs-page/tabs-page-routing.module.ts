import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SpacePage } from '../space/space.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'space',
        children: [
          {
            path: '',
            component: SpacePage,
            loadChildren: () => import('../space/space.module').then(m => m.SpaceModule)
          },
          {
            path: 'add-item',
            loadChildren: () => import('../add-item/add-item.module').then(m => m.AddItemPageModule)
          }
        ]
      },
      {
        path: 'shopping-list',
        children: [{
          path: '',
          loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListPageModule)
        }]
      },
      {
        path: 'account',
        children: [{
          path: '',
          loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
        }]
      },
      {
        path: '',
        redirectTo: '/app/tabs/space',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

