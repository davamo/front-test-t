import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { CreateProductDto } from '../models/create-product.dto';
import { UpdateProductDto } from '../models/update-product.dto';

const LOCAL_STORAGE_KEY = 'mock_products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject: BehaviorSubject<Product[]>;
  private apiUrl: string = environment.apiBaseURL + '/products';


  constructor(private http: HttpClient) {
    const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialProducts: Product[] = savedProducts ? JSON.parse(savedProducts) : [];
    this.productsSubject = new BehaviorSubject<Product[]>(initialProducts);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Error al obtener productos, usando mock:', error);
        return of(this.productsSubject.getValue());
      })
    );
  }

  addProduct(product: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product).pipe(
      catchError(error => {
        console.error('Error al agregar producto, usando mock:', error);
        const newProduct: Product = {
          id: this.getNextMockId(),
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          category: {
            id: product.categoryId,
            name: 'Mock Category',
            typeImg: 'mock'
          }
        };

        const updatedProducts = [...this.productsSubject.getValue(), newProduct];
        this.productsSubject.next(updatedProducts);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));

        return of(newProduct);
      })
    );
  }

  updateProduct(id: number, product: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      catchError(error => {
        console.error('Error al actualizar producto, usando mock:', error);

        const original = this.productsSubject.getValue().find(p => p.id === id);
        if (!original) return of(undefined as any);

        const updated: Product = {
          ...original,
          ...product,
          category: {
            id: product.categoryId ?? original.category.id,
            name: 'Mock Category',
            typeImg: 'mock'
          }
        };

        const products = this.productsSubject.getValue().map(p =>
          p.id === id ? updated : p
        );

        this.productsSubject.next(products);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));

        return of(updated);
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar producto, usando mock:', error);
        const updatedProducts = this.productsSubject.getValue().filter(product => product.id !== id);

        this.productsSubject.next(updatedProducts);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));

        return of(null);
      })
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener producto por ID, usando mock:', error);
        const product = this.productsSubject.getValue().find(p => p.id === id);
        return of(product);
      })
    );
  }

  clearProducts(): void {
    this.productsSubject.next([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log('🧹 Productos eliminados');
  }

  private getNextMockId(): number {
    const products = this.productsSubject.getValue();
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }

  checkCategoryExists(categoryId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/categories/exists/${categoryId}`);
  }
  
}
