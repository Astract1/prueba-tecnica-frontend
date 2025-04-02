import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Product } from '../domain/product.model';
import { ProductRepositoryPort } from '../ports/repositories/product-repository.port';
import { GetProductsByCategoryUseCase } from './get-products-by-category.usecase';


// Se define el bloque de pruebas para el caso de uso "GetProductsByCategoryUseCase".
describe('GetProductsByCategoryUseCase', () => {
  // Declaramos las variables que se utilizarán en los tests.
  let useCase: GetProductsByCategoryUseCase;
  let repositoryMock: jasmine.SpyObj<ProductRepositoryPort>;
  
  // Datos de prueba: arreglo de productos simulado con una única entrada.
  // Este arreglo representa el resultado esperado al filtrar por la categoría "Electronics".
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Productos Electronicos',
      description: 'Descripcion de productos electronicos',
      price: 100,
      category: 'Electronics'
    }
  ];
  

  beforeEach(() => {
   
    const spy = jasmine.createSpyObj('ProductRepositoryPort', ['getByCategory']);
    
    // Configuramos el módulo de pruebas de Angular inyectando el caso de uso y el mock del repositorio.
    TestBed.configureTestingModule({
      providers: [
        GetProductsByCategoryUseCase,
        { provide: ProductRepositoryPort, useValue: spy }
      ]
    });
    
    // Se inyecta el caso de uso y el repositorio simulado desde el TestBed.
    useCase = TestBed.inject(GetProductsByCategoryUseCase);
    repositoryMock = TestBed.inject(ProductRepositoryPort) as jasmine.SpyObj<ProductRepositoryPort>;
  });
  
  // Test para verificar que la instancia del caso de uso se crea correctamente.
  it('Se crea el componente', () => {
    expect(useCase).toBeTruthy();
  });
  
  // Test para comprobar que el caso de uso retorna los productos filtrados por categoría.
  it('Retorna los productos filtadros por categoria', (done) => {
    // Arrange:
    // Definimos la categoría a filtrar y configuramos el mock para que retorne un observable con los productos de prueba.
    const category = 'Electronics';
    repositoryMock.getByCategory.and.returnValue(of(mockProducts));
    
    // Act:
    // Se ejecuta el caso de uso pasando la categoría y se subscribe al observable resultante.
    useCase.execute(category).subscribe((products) => {
      // Assert:
      // Verificamos que el arreglo de productos retornado sea igual al de prueba.
      expect(products).toEqual(mockProducts);
      // Comprobamos que el método 'getByCategory' del repositorio fue llamado con el parámetro correcto.
      expect(repositoryMock.getByCategory).toHaveBeenCalledWith(category);
      done();
    });
  });
});
