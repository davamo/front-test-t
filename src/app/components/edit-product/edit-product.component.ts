import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  productId!: number;
  product!: Product;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      images: ['']
    });
  }

  ngOnInit(): void {
    console.log('ID recibido por ruta:', this.productId);
    
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    const product = this.productService.getProductById(this.productId);
  
    if (!product) {
      this.snackBar.open('⚠️ Producto no encontrado', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/products']);
      return;
    }
  
    this.product = product;
    this.form.patchValue(this.product);
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.form.value
      };

      this.productService.updateProduct(updatedProduct);

      this.snackBar.open('✅ Producto actualizado con éxito', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/products']);
    } else {
      this.snackBar.open('⚠️ Completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
