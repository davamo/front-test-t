import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    ConfirmDialogComponent,
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  loading = true;
  errorMessage = '';
  searchTerm: string = '';
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter();
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
      (p.title && p.title.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term)) ||
      (p.category && p.category.name && p.category.name.toLowerCase().includes(term))
    );

    this.pageIndex = 0;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.updatePaginatedProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  createProduct(): void {
    this.router.navigate(['/products/add']);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '/images/paisajeamarillo.png';
  }

  viewProduct(product: Product): void {
    console.log('Ver producto:', product);
  }

  removeProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.applyFilter();
        this.snackBar.open('🗑️ Producto eliminado', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        this.snackBar.open('❌ Error al eliminar el producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  editProduct(product: Product): void {
    console.log('Editar producto:', product);
    this.router.navigate(['/products/edit', product.id]);
  }

  confirmDelete(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeProduct(product);
      }
    });
  }
  
}