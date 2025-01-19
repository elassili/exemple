import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})

export class CustomersComponent implements OnInit {
  public newOrder = {
    skuCode: null,
    quantity: null,
    price: null, 
  };

  public products: any[] = [];
  public errorMessage: string = '';  
  public successMessage : string ='';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:9000/api/product').subscribe({
      next: (data) => {
        this.products = data;  
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits:', err);
      }
    });
  }

  addOrder() {
    this.http.post('http://localhost:9000/api/order', this.newOrder, { responseType: 'text' })
    .subscribe({
      next: (order) => {
        console.log('Commande ajoutée:', order);
        this.successMessage = 'Commande passé avec succès'; 
        this.resetForm();
        this.errorMessage = ''; 
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la commande:', err);
        this.errorMessage = "Produit non disponible en stock ou quantité demandée supérieure à celle disponible";
      }
    });
  }

  onProductChange() {
    const selectedProduct = this.products.find(product => product.name === this.newOrder.skuCode);
    if (selectedProduct) {
      this.newOrder.price = selectedProduct.price; 
    }
  }

  resetForm() {
    this.newOrder = {
      skuCode: null,
      quantity: null,
      price: null,
    };
  }
}
