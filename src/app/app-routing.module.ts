import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./ui/products/products.component";
import {CustomersComponent} from "./ui/customers/customers.component";
import {AuthGuard} from "./guards/auth.guard";
import {OrdersComponent} from "./ui/orders/orders.component";

const routes: Routes = [
  {path : "products", component : ProductsComponent, canActivate : [AuthGuard], data : {roles :['ADMIN']}},
  {path : "placeOrder", component : CustomersComponent, canActivate : [AuthGuard], data : {roles : ['USER']}},
  {path : "orders", component : OrdersComponent, canActivate : [AuthGuard], data : {roles : ['USER']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
