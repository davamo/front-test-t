import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CreateProductDto } from '../../models/create-product.dto';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core'; 

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
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule, 
    MatOptionModule 
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  routerAccessor(routerAccessor: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  productServiceAccessor(productServiceAccessor: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  form: FormGroup;
  categories: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryId: [null, [Validators.required, Validators.min(1)]],
      images: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Obtener las categorías disponibles al inicio
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this.snackBar.open('❌ Error al obtener las categorías', 'Cerrar', { duration: 3000 });
      }
    );
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
      this.snackBar.open('⚠️ Completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
      return;
    }

    // Verificar si el categoryId es válido
    const categoryId = this.form.value.categoryId;
    const categoryExists = this.categories.some(category => category.id === categoryId);

    if (!categoryExists) {
      this.snackBar.open('❌ La categoría no es válida. Por favor, selecciona una categoría válida.', 'Cerrar', { duration: 3000 });
      return;
    }

    const formValue: CreateProductDto = this.form.value;

    this.productService.addProduct(formValue).subscribe({
      next: () => {
        this.snackBar.open('✅ Producto agregado con éxito', 'Cerrar', { duration: 3000 });
        this.form.reset();
        this.images.clear();
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

  openSnackBar({ message, action }: { message: string; action: string; }) {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
