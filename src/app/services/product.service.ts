import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiBaseURL}/${environment.apiVersion}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      catchError(() => {
        console.error('Error al cargar productos');
        return of([
          { id: 1, name: 'Mock 1', images: '', price: 19990, title: 'Mock Title 1', description: 'Mock Description 1', category: 'Category1'  },
          { id: 2, name: 'Mock 2', images: '', price: 29990, title: 'Mock Title 2', description: 'Mock Description 2', category: 'Category2'  }
        ]);
      })
    );
  }
  

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
