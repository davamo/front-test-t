import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product.model';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProduct: Product = {
    id: 1,
    title: 'Laptop HP',
    price: 99990,
    description: 'Potente laptop de alto rendimiento',
    images: ['https://example.com/laptop.jpg'],
    category: {
      id: 1, name: 'Tecnología',
      typeImg: ''
    }
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [MatCardModule, MatIconModule, MatButtonModule, NoopAnimationsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('debería mostrar título, precio y descripción del producto', () => {
    const card = fixture.nativeElement as HTMLElement;
    expect(card.textContent).toContain(mockProduct.title);
    expect(card.textContent).toContain(mockProduct.price.toString());
    expect(card.textContent).toContain(mockProduct.description);
    expect(card.textContent).toContain(mockProduct.category.name);
  });

  it('debería navegar a la vista de edición al hacer clic en el botón editar', () => {
    const editButton = fixture.debugElement.query(By.css('[data-cy="edit-button"]'));
    editButton.triggerEventHandler('click', null);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products/edit', mockProduct.id]);
  });

  it('debería emitir el evento delete al hacer clic en eliminar', () => {
    spyOn(component.delete, 'emit');
    const deleteButton = fixture.debugElement.query(By.css('[data-cy="delete-button"]'));
    deleteButton.triggerEventHandler('click', null);

    expect(component.delete.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('debería mostrar imagen de respaldo si la principal falla', () => {
    const image = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;

    // Simular evento de error
    image.src = 'https://badurl.com';
    component.onImageError({ target: image } as unknown as Event);

    expect(image.src).toContain('/assets/placeholder.png');
  });
});
