import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './ui/products/products.component';
import { CustomersComponent } from './ui/customers/customers.component';
import {HttpClientModule} from "@angular/common/http";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { OrdersComponent } from './ui/orders/orders.component';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8181',
        realm: 'spring-microservices-security-realm',
        clientId: 'spring-microservices-security-realm'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, KeycloakAngularModule,
    FormsModule, CommonModule, HttpClientModule
  ],
  providers: [
    {provide : APP_INITIALIZER, useFactory : initializeKeycloak, multi :true, deps : [KeycloakService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
