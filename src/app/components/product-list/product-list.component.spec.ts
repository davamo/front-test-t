import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ✅ Mock de productos
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Producto Uno',
    images: ['https://via.placeholder.com/150'],
    price: 10000,
    title: 'Zapato de cuero',
    description: 'Zapato cómodo de cuero sintético.',
    category: { id: 1, name: 'Calzado', typeImg: '' }
  },
  {
    id: 2,
    name: 'Producto Dos',
    images: ['https://via.placeholder.com/150'],
    price: 20000,
    title: 'Chaqueta impermeable',
    description: 'Ideal para días lluviosos.',
    category: { id: 2, name: 'Ropa', typeImg: '' }
  }
];

// ✅ Mock del servicio
class MockProductService {
  getProducts() {
    return of(mockProducts);
  }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, BrowserAnimationsModule],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map() } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display mock products', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const cards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(2);

    const titleElement = cards[0].nativeElement.querySelector('h3');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain(mockProducts[0].title);
  });
});