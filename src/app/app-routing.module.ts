import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HomepageComponent }  from './homepage/homepage.component';
import { ProductlistComponent }  from './productlist/productlist.component';
import {CartComponent} from './cart/cart.component'
import {CheckoutComponent} from './checkout/checkout.component'
import {OrderConfirmationComponent} from './order-confirmation/order-confirmation.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'products/:id', component: ProductlistComponent },
  { path: 'products', component: ProductlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orderConfirmation', component: OrderConfirmationComponent },
  { path: 'orderConfirmation/', component: OrderConfirmationComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{ enableTracing: false }) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule {}