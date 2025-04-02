import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../domain/product.model';
import { ProductRepositoryPort } from '../ports/repositories/product-repository.port';
import { GetProductsUseCase } from './get-products.usecase';

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;
  let repositoryMock: jasmine.SpyObj<ProductRepositoryPort>;
  
  // Se define un arreglo simulado de productos para utilizar en las pruebas.
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
    // Se crea un espía del repositorio, simulando el método 'getAll'.
    const spy = jasmine.createSpyObj('ProductRepositoryPort', ['getAll']);
    
    // Se configura el módulo de pruebas, inyectando el caso de uso y el espía del repositorio.
    TestBed.configureTestingModule({
      providers: [
        GetProductsUseCase,
        { provide: ProductRepositoryPort, useValue: spy }
      ]
    });
    
    // Se inyecta el caso de uso y el repositorio simulado desde el TestBed.
    useCase = TestBed.inject(GetProductsUseCase);
    repositoryMock = TestBed.inject(ProductRepositoryPort) as jasmine.SpyObj<ProductRepositoryPort>;
  });
  
  // Prueba que verifica que la instancia del caso de uso se crea correctamente.
  it('Se crea el componente', () => {
    expect(useCase).toBeTruthy();
  });
  

  it('Retorna todos los productos del repositorio', (done) => {
    // Arrange: Configura el mock para que retorne un observable con los productos simulados.
    repositoryMock.getAll.and.returnValue(of(mockProducts));
    
    // Act: Ejecuta el caso de uso y se suscribe al observable resultante.
    useCase.execute().subscribe((products) => {
      // Assert: Comprueba que los productos retornados sean los esperados y que el método 'getAll'
      // del repositorio haya sido llamado una vez.
      expect(products).toEqual(mockProducts);
      expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
