import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }

  createProduct(): void {
    console.log('Crear producto');
    // Puedes abrir un diálogo, navegar a otro formulario, etc.
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/notimage.png';
  }

  viewProduct(product: Product): void {
    console.log('Ver producto:', product);
  }

  editProduct(product: Product): void {
    console.log('Editar producto:', product);
  }

  removeProduct(product: Product): void {
    this.products = this.products.filter(p => p.id !== product.id);
    console.log('Producto eliminado:', product);
  }
}
