import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { LoadingService } from '../../services/loading.service';
import { environment } from '../../../environments/environment';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    SideMenuComponent,
    // ProductListComponent,
    ProductTableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading.setIsLoading(true);
      this.productService.getProducts().subscribe((data) => {
        this.products = data;
        this.loading.setIsLoading(false);
      });
    }, environment.pageInitialStartLoadingServiceDelay);
  }
}
