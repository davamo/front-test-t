import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product.model';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'Producto de prueba',
    title: 'Título de prueba',
    price: 19990,
    description: 'Descripción de prueba',
    images: ['https://example.com/image.png'],
    category: {
      id: 1,
      name: 'Categoría Prueba',
      typeImg: 'categoría-icono'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductCardComponent,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getSafeImage()', () => {
    it('should return the same URL if it has a valid image extension', () => {
      const url = 'https://example.com/image.png';
      const urlWithQuery = 'https://example.com/image.jpg?r=123';

      expect(component.getSafeImage(url)).toBe(url);
      expect(component.getSafeImage(urlWithQuery)).toBe(urlWithQuery);
    });

    it('should return fallback image for URLs with invalid or no extension', () => {
      const fallback = '/images/paisajeamarillo.png';

      expect(component.getSafeImage('')).toBe(fallback);
      expect(component.getSafeImage('https://example.com/image')).toBe(fallback);
      expect(component.getSafeImage('https://example.com/file.txt')).toBe(fallback);
      expect(component.getSafeImage('https://example.com/image.exe')).toBe(fallback);
    });
  });
});
