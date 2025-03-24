import { TestBed } from '@angular/core/testing';
import { ProductService } from '../../../app/services/product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { CreateProductDto } from '../../models/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    images: ['image1.jpg'],
    category: {
      id: 1,
      name: 'Test Category',
      typeImg: 'test-image'
    }
  };

  const mockCreateProduct: CreateProductDto = {
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    categoryId: 1,
    images: ['image1.jpg']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to mock HTTP calls
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no HTTP requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error when adding a product', () => {
    // Arrange: set up the mock error response
    const mockError = { status: 400, statusText: 'Bad Request' };

    // Act: call the addProduct method
    service.addProduct(mockCreateProduct).subscribe(
      () => fail('Expected an error, but got success'),
      (error) => {
        // Assert: verify that the error is handled
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      }
    );

    // Assert: check that the HTTP POST request was made and an error was thrown
    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', mockError); // Simulate an error response from the server
  });

  it('should add a product successfully', () => {
    // Arrange: set up the mock response
    const mockResponse: Product = {
      ...mockProduct,
      id: 2 // Assigning a new ID to the product after it is added
    };

    // Act: call the addProduct method
    service.addProduct(mockCreateProduct).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Assert: check that the HTTP POST request was made and that the response is as expected
    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Simulate the response from the server
  });
});
