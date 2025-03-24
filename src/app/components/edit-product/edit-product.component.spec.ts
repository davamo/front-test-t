import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute for mocking
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Mocking services
class MockProductService {
  getProductById(id: number) {
    return of({
      id: 1,
      title: 'Test Product',
      price: 100,
      description: 'Test Description',
      category: { id: 2, name: 'Test Category', typeImg: 'test-image' },
      images: ['image1.jpg']
    });
  }

  updateProduct(id: number, product: any) {
    return of({ ...product, id });
  }
}

class MockCategoryService {
  getCategories() {
    return of([{ id: 2, name: 'Test Category' }]);
  }
}

// Mock ActivatedRoute
class MockActivatedRoute {
  snapshot = { paramMap: { get: () => '1' } };  // Mocking the paramMap for `id`
}

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [
        EditProductComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },  // Mock ActivatedRoute here
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Prevents errors for unknown elements like mat-form-field, mat-select, etc.
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
