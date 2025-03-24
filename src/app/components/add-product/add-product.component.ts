import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// Servicio y modelo
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryId: [null, [Validators.required, Validators.min(1)]],
      images: this.fb.array([])
    });
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  addImage(): void {
    this.images.push(this.fb.control(''));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open('⚠️ Completa todos los campos obligatorios correctamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const newProduct = {
      title: this.form.value.title,
      price: this.form.value.price,
      description: this.form.value.description,
      categoryId: this.form.value.categoryId,
      images: this.form.value.images
    };

    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        this.snackBar.open('✅ Producto agregado con éxito', 'Cerrar', { duration: 3000 });
        this.form.reset();
        this.router.navigate(['/products']);
      },
      error: () => {
        this.snackBar.open('❌ Error al agregar el producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}