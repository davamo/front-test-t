import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'products/add',
    loadComponent: () =>
      import('./components/add-product/add-product.component').then(m => m.AddProductComponent)
  },
  {
    path: 'products/edit/:id',
    loadComponent: () =>
      import('./components/edit-product/edit-product.component').then(m => m.EditProductComponent)
  },
  { path: '**', redirectTo: 'products' }
];
