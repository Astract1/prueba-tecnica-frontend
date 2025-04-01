import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../domain/product.model';
import { ProductRepositoryPort } from '../ports/repositories/product-repository.port';
import { GetProductsUseCase } from './get-products.usecase';

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;
  let repositoryMock: jasmine.SpyObj<ProductRepositoryPort>;
  
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category'
    }
  ];
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductRepositoryPort', ['getAll']);
    
    TestBed.configureTestingModule({
      providers: [
        GetProductsUseCase,
        { provide: ProductRepositoryPort, useValue: spy }
      ]
    });
    
    useCase = TestBed.inject(GetProductsUseCase);
    repositoryMock = TestBed.inject(ProductRepositoryPort) as jasmine.SpyObj<ProductRepositoryPort>;
  });
  
  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });
  
  it('should return all products from the repository', (done) => {
    // Arrange
    repositoryMock.getAll.and.returnValue(of(mockProducts));
    
    // Act
    useCase.execute().subscribe((products) => {
      // Assert
      expect(products).toEqual(mockProducts);
      expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
