import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../domain/product.model';
import { ProductRepositoryPort } from '../ports/repositories/product-repository.port';
import { GetProductsByCategoryUseCase } from './get-products-by-category.usecase';

describe('GetProductsByCategoryUseCase', () => {
  let useCase: GetProductsByCategoryUseCase;
  let repositoryMock: jasmine.SpyObj<ProductRepositoryPort>;
  
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Electronics Product',
      description: 'Test Description',
      price: 100,
      category: 'Electronics'
    }
  ];
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductRepositoryPort', ['getByCategory']);
    
    TestBed.configureTestingModule({
      providers: [
        GetProductsByCategoryUseCase,
        { provide: ProductRepositoryPort, useValue: spy }
      ]
    });
    
    useCase = TestBed.inject(GetProductsByCategoryUseCase);
    repositoryMock = TestBed.inject(ProductRepositoryPort) as jasmine.SpyObj<ProductRepositoryPort>;
  });
  
  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });
  
  it('should return products filtered by category', (done) => {
    // Arrange
    const category = 'Electronics';
    repositoryMock.getByCategory.and.returnValue(of(mockProducts));
    
    // Act
    useCase.execute(category).subscribe((products) => {
      // Assert
      expect(products).toEqual(mockProducts);
      expect(repositoryMock.getByCategory).toHaveBeenCalledWith(category);
      done();
    });
  });
});
