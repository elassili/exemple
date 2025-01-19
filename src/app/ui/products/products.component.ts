import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any[] = [];
  public newProduct = {
    name: '',
    description:'',
    price: null,
    quantity: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:9000/api/product').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addProduct() {
    this.http.post('http://localhost:9000/api/product', this.newProduct).subscribe({
      next: (product) => {
        console.log('Produit ajouté:', product);
        this.products.push(product); 
        this.resetForm(); 
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du produit:', err);
      }
    });
  }

  resetForm() {
    this.newProduct = {
      name: '',
      description:'',
      price: null,
      quantity: null
    };
  }
}
