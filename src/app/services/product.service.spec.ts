import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Product } from '../models/product.model';
import { CreateProductDto } from '../models/create-product.dto';
import { UpdateProductDto } from '../models/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let mockProducts: Product[];

  beforeEach(() => {
    mockProducts = [
      {
        id: 1, title: 'Test Product 1', description: 'Test Description 1', price: 100, category: { id: 1, name: 'Test Category', typeImg: 'test' }, images: ['image1.jpg']
      },
      {
        id: 2, title: 'Test Product 2', description: 'Test Description 2', price: 200, category: { id: 2, name: 'Test Category 2', typeImg: 'test' }, images: ['image2.jpg']
      }
    ];

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(mockProducts.length);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should add a product', () => {
    const newProduct: CreateProductDto = {
      title: 'New Product',
      description: 'New Description',
      price: 300,
      categoryId: 1,
      images: ['image3.jpg']
    };

    service.addProduct(newProduct).subscribe(product => {
      expect(product.id).toBeDefined();
      expect(product.title).toBe(newProduct.title);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newProduct, id: 3 });
  });

  it('should update a product', () => {
    const updateProductDto: UpdateProductDto = {
      title: 'Updated Product',
      description: 'Updated Description',
      price: 400,
      categoryId: 2,
      images: ['image4.jpg']
    };

    service.updateProduct(1, updateProductDto).subscribe(updatedProduct => {
      expect(updatedProduct.id).toBe(1);
      expect(updatedProduct.title).toBe(updateProductDto.title);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockProducts[0], ...updateProductDto });
  });

  it('should delete a product', () => {
    service.deleteProduct(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get a product by id', () => {
    service.getProductById(1).subscribe(product => {
      expect(product).toEqual(mockProducts[0]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts[0]);
  });

  it('should clear products', () => {
    service.clearProducts();
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(0);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});


