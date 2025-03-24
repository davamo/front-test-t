import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from '../../models/product.model';
import { ReactiveFormsModule } from '@angular/forms';

const mockProduct: Product = {
  id: 1,
  name: 'Mock Product',
  title: 'Mock Title',
  price: 999,
  description: 'Mock Description',
  images: ['https://via.placeholder.com/150'],
  category: {
    id: 2,
    name: 'Electronics',
    typeImg: 'tech'
  }
};

class MockProductService {
  getProductById(id: number) {
    return of(mockProduct);
  }
  updateProduct(id: number, dto: any) {
    return of({ ...mockProduct, ...dto });
  }
}

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [EditProductComponent, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]) } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with product data', () => {
    expect(component.form.value.title).toBe(mockProduct.title);
    expect(component.form.value.price).toBe(mockProduct.price);
    expect(component.form.value.description).toBe(mockProduct.description);
    expect(component.form.value.category.id).toBe(mockProduct.category.id);
  });

  it('should call updateProduct on submit when form is valid', () => {
    spyOn(TestBed.inject(ProductService), 'updateProduct').and.callThrough();
    component.onSubmit();
    expect(TestBed.inject(ProductService).updateProduct).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });
});
