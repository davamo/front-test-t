import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

// Servicios y modelos
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { UpdateProductDto } from '../../models/update-product.dto';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  productId!: number;
  product!: Product;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
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

    // Obtener categorías
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        this.openSnackBar('❌ Error al obtener las categorías', 'Cerrar');
      }
    );

    // Obtener producto por ID
    this.productService.getProductById(this.productId).subscribe(product => {
      if (!product) {
        this.openSnackBar('⚠️ Producto no encontrado', 'Cerrar');
        this.router.navigate(['/products']);
        return;
      }

      this.product = product;

      // ✅ Asignar correctamente el ID de la categoría
      this.form.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id
      });

      this.setImages(product.images);

      console.log('✅ Producto cargado para edición:', this.form.value);
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
      this.openSnackBar('⚠️ Completa todos los campos requeridos.', 'Cerrar');
      return;
    }

    const updatedProduct: UpdateProductDto = this.form.getRawValue();

    console.log('📦 Enviando actualización de producto:', updatedProduct);

    this.productService.updateProduct(this.productId, updatedProduct).subscribe({
      next: () => {
        this.openSnackBar('✅ Producto actualizado con éxito', 'Cerrar');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('❌ Error al actualizar producto:', err);
        this.openSnackBar('❌ Error al actualizar el producto', 'Cerrar');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
