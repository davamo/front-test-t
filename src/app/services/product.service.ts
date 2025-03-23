import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

const LOCAL_STORAGE_KEY = 'mock_products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject: BehaviorSubject<Product[]>;

  constructor() {
    const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialProducts: Product[] = savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            id: 1,
            name: 'Mock 1',
            title: 'Mock Title 1',
            description: 'Mock Description 1',
            category: 'Category1',
            price: 19990,
            images: ''
          },
          {
            id: 2,
            name: 'Mock 2',
            title: 'Mock Title 2',
            description: 'Mock Description 2',
            category: 'Category2',
            price: 29990,
            images: ''
          }
        ];

    this.productsSubject = new BehaviorSubject<Product[]>(initialProducts);
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getNextMockId(): number {
    const products = this.productsSubject.getValue();
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }

  addProduct(product: Product): void {
    const newProduct = { ...product, id: this.getNextMockId() };
    const updatedProducts = [...this.productsSubject.getValue(), newProduct];

    this.productsSubject.next(updatedProducts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));

    console.log('✅ Producto agregado:', newProduct);
    console.log('🧾 Lista persistida:', updatedProducts);
  }

  deleteProduct(id: number): void {
    const updatedProducts = this.productsSubject
      .getValue()
      .filter(product => product.id !== id);
  
    this.productsSubject.next(updatedProducts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProducts));
  
    console.log(`🗑️ Producto con ID ${id} eliminado`);
  }
  

  getProductById(id: number): Product | undefined {
    return this.productsSubject.getValue().find(p => p.id === id);
  }
  
  updateProduct(updatedProduct: Product): void {
    const products = this.productsSubject.getValue().map(p =>
      p.id === updatedProduct.id ? { ...updatedProduct } : p
    );
  
    this.productsSubject.next(products);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  
    console.log(`✏️ Producto actualizado:`, updatedProduct);
  }
  
  clearProducts(): void {
    this.productsSubject.next([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  
    console.log('🧹 Productos eliminados');
  }

  editProduct(product: Product): void {
    console.log('Editar producto....:', product);
  }

}
