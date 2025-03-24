import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { UpdateProductDto } from '../../models/update-product.dto';

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
    MatIconModule,
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
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryId: [null, [Validators.required, Validators.min(1)]],
      images: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(product => {
      if (!product) {
        this.snackBar.open('⚠️ Producto no encontrado', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/products']);
        return;
      }

      this.product = product;
      this.form.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id
      });

      this.setImages(product.images);
    });
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  setImages(images: string[]): void {
    this.images.clear();
    images.forEach(img => this.images.push(this.fb.control(img)));
  }

  addImage(): void {
    this.images.push(this.fb.control(''));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open('⚠️ Completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
      return;
    }

    const updatedProduct: UpdateProductDto = {
      title: this.form.value.title,
      price: this.form.value.price,
      description: this.form.value.description,
      categoryId: this.form.value.categoryId,
      images: this.form.value.images
    };

    this.productService.updateProduct(this.productId, updatedProduct).subscribe({
      next: () => {
        this.snackBar.open('✅ Producto actualizado con éxito', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/products']);
      },
      error: () => {
        this.snackBar.open('❌ Error al actualizar el producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
