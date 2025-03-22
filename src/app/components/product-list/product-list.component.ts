import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

// Angular Common & Router
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  errorMessage = '';

  searchTerm: string = '';
  filteredProducts: Product[] = [];


  constructor(private productService: ProductService,
    private snackBar: MatSnackBar  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter(); // aplicar filtro inicial
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }
  

  applyFilter(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }
  

  createProduct(): void {
    console.log('Crear producto');
    // Si decides redirigir desde aquí en lugar de routerLink, usa: this.router.navigate(['/products/add']);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/notimage.png';
  }

  viewProduct(product: Product): void {
    console.log('Ver producto:', product);
  }

  editProduct(product: Product): void {
    console.log('Editar producto....:', product);
  }

  removeProduct(product: Product): void {
    this.products = this.products.filter(p => p.id !== product.id);
    this.applyFilter();
    this.snackBar.open('🗑️ Producto eliminado (simulado)', 'Cerrar', {
      duration: 3000
    });
  }

}
