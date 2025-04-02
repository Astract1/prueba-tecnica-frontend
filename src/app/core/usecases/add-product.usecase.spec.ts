
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Product, ProductCreateDTO } from '../domain/product.model';
import { ProductRepositoryPort } from '../ports/repositories/product-repository.port';
import { AddProductUseCase } from './add-product.usecase';

// Describimos el conjunto de pruebas para el caso de uso de añadir un producto.
describe('AddProductUseCase', () => {
  // Variables que serán inicializadas en cada test.
  let useCase: AddProductUseCase;
  let repositoryMock: jasmine.SpyObj<ProductRepositoryPort>;
  
  // Datos de prueba: objeto que representa la información necesaria para crear un producto.
  const mockProductDTO: ProductCreateDTO = {
    name: 'New Product',
    description: 'New Description',
    price: 150,
    category: 'Books'
  };
  
  // Objeto de respuesta simulado que representa el producto creado, incluyendo un id generado.
  const mockProductResponse: Product = {
    id: '123',
    ...mockProductDTO
  };
  
  // Se configura el módulo de pruebas antes de cada test.
  beforeEach(() => {
    // Creamos un espía (mock) del repositorio, simulando el método 'add'.
    const spy = jasmine.createSpyObj('ProductRepositoryPort', ['add']);
    
    // Configuramos el módulo de pruebas inyectando el caso de uso y el mock del repositorio.
    TestBed.configureTestingModule({
      providers: [
        AddProductUseCase,
        { provide: ProductRepositoryPort, useValue: spy }
      ]
    });
    
    // Inyectamos el caso de uso y el repositorio simulado para usarlos en los tests.
    useCase = TestBed.inject(AddProductUseCase);
    repositoryMock = TestBed.inject(ProductRepositoryPort) as jasmine.SpyObj<ProductRepositoryPort>;
  });
  
  // Test para comprobar que la instancia del caso de uso se crea correctamente.
  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });
  
  // Test para verificar que al ejecutar el caso de uso se invoca el método 'add' del repositorio y se retorna el producto creado.
  it('should add a new product through the repository', (done) => {
    // Arrange: Configuramos el mock para que devuelva un observable del producto simulado.
    repositoryMock.add.and.returnValue(of(mockProductResponse));
    
    // Act: Ejecutamos el caso de uso pasándole el objeto DTO.
    useCase.execute(mockProductDTO).subscribe((product) => {
      // Assert: Verificamos que el producto devuelto es el esperado.
      expect(product).toEqual(mockProductResponse);
      // Comprobamos que el producto tiene un id definido.
      expect(product.id).toBeTruthy();
      // Aseguramos que el método 'add' del repositorio fue llamado con el DTO correcto.
      expect(repositoryMock.add).toHaveBeenCalledWith(mockProductDTO);
      done();
    });
  });
});
