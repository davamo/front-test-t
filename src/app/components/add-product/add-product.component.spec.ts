import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockProductService {
  addProduct(dto: any) {
    return of({ id: 1, ...dto });
  }
}

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [
        AddProductComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.value.title).toBe('');
    expect(component.form.value.price).toBe(0);
    expect(component.form.value.description).toBe('');
    expect(component.form.value.categoryId).toBe(null);
    expect(component.images.length).toBe(0);
  });

  it('should add an image control when addImage is called', () => {
    component.addImage();
    expect(component.images.length).toBe(1);
  });

  it('should remove an image control when removeImage is called', () => {
    component.addImage();
    component.addImage();
    expect(component.images.length).toBe(2);
    component.removeImage(0);
    expect(component.images.length).toBe(1);
  });

  it('should call addProduct and navigate on valid submit', () => {
    spyOn(TestBed.inject(ProductService), 'addProduct').and.callThrough();

    component.form.patchValue({
      title: 'Nuevo Producto',
      price: 500,
      description: 'Descripción demo',
      categoryId: 3
    });
    component.addImage();
    component.images.at(0).setValue('https://img.com/img1.jpg');

    component.onSubmit();

    expect(TestBed.inject(ProductService).addProduct).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should not call addProduct if form is invalid', () => {
    spyOn(TestBed.inject(ProductService), 'addProduct');
    component.form.patchValue({ title: '', price: -10 });
    component.onSubmit();
    expect(TestBed.inject(ProductService).addProduct).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});