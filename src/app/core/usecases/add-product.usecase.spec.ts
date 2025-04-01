import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product, ProductCreateDTO } from '../domain/product.model';
import { ProductRepositoryPort } from '../ports/repositories/product-repository.port';
import { AddProductUseCase } from './add-product.usecase';

describe('AddProductUseCase', () => {
  let useCase: AddProductUseCase;
  let repositoryMock: jasmine.SpyObj<ProductRepositoryPort>;
  
  const mockProductDTO: ProductCreateDTO = {
    name: 'New Product',
    description: 'New Description',
    price: 150,
    category: 'Books'
  };
  
  const mockProductResponse: Product = {
    id: '123',
    ...mockProductDTO
  };
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductRepositoryPort', ['add']);
    
    TestBed.configureTestingModule({
      providers: [
        AddProductUseCase,
        { provide: ProductRepositoryPort, useValue: spy }
      ]
    });
    
    useCase = TestBed.inject(AddProductUseCase);
    repositoryMock = TestBed.inject(ProductRepositoryPort) as jasmine.SpyObj<ProductRepositoryPort>;
  });
  
  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });
  
  it('should add a new product through the repository', (done) => {
    // Arrange
    repositoryMock.add.and.returnValue(of(mockProductResponse));
    
    // Act
    useCase.execute(mockProductDTO).subscribe((product) => {
      // Assert
      expect(product).toEqual(mockProductResponse);
      expect(product.id).toBeTruthy();
      expect(repositoryMock.add).toHaveBeenCalledWith(mockProductDTO);
      done();
    });
  });
});