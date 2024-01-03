import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ecommerce/pages-ecommerce/home/home.component';
import { PagesComponent } from './pages.component';
import { AboutComponent } from './ecommerce/pages-ecommerce/about/about.component';
import { ShoppingCartComponent } from './ecommerce/pages-ecommerce/shopping-cart/shopping-cart.component';
import { ShopComponent } from './ecommerce/pages-ecommerce/shop/shop.component';
import { ChekoutComponent } from './ecommerce/pages-ecommerce/chekout/chekout.component';
import { notFoundComponent } from './404/404.component';

const routes: Routes = [
  {
    path: 'pages', 
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'checkout', component: ChekoutComponent }
    ]
  },
  {
    path: '404-not-found', component: notFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
