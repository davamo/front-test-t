import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule
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
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      images: ['']
    });
  }

  onSubmitBack(): void {
    console.log("data ::::::::::::", this.form.value);
    if (this.form.valid) {
      const formValue = this.form.value;

      // Obtener el ID simulado desde el servicio
      const newId = this.productService.getNextMockId();

      const newProduct: Product = {
        id: newId,
        ...formValue
      };

      this.productService.addProduct(newProduct);

      this.snackBar.open('✅ Producto agregado con éxito (mock)', 'Cerrar', {
        duration: 3000
      });

      this.router.navigate(['/products']);
    } else {
      this.snackBar.open('⚠️ Completa todos los campos requeridos.', 'Cerrar', {
        duration: 3000
      });
    }
  }


  onSubmit(): void {
    const formValue = this.form.value;
  
    // Validación básica: nombre obligatorio
    if (!formValue.name?.trim()) {
      this.snackBar.open('⚠️ El nombre del producto es obligatorio.', 'Cerrar', {
        duration: 3000
      });
      return;
    }
  
    const newProduct: Product = {
      id: this.productService.getNextMockId(), // ID autoincremental simulado
      name: formValue.name,
      title: formValue.title,
      description: formValue.description,
      category: formValue.category,
      price: formValue.price,
      images: formValue.images
    };
  
    // Agregar a la lista simulada
    this.productService.addProduct(newProduct);
  
    this.snackBar.open('✅ Producto agregado (simulado)', 'Cerrar', {
      duration: 3000
    });
  
    // Reset formulario reactivo
    this.form.reset();
  
    // Volver a la lista
    this.router.navigate(['/products']);
  }
  

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
