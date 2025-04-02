import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

import { AddProductUseCase } from './core/usecases/add-product.usecase';
import { GetProductsUseCase } from './core/usecases/get-products.usecase';
import { GetProductsByCategoryUseCase } from './core/usecases/get-products-by-category.usecase';
import { ProductRepositoryPort } from './core/ports/repositories/product-repository.port';
import { ProductRepositoryFactory } from './infrastructure/factories/product-repository.factory';
import { InMemoryProductRepositoryAdapter } from './infrastructure/adpaters/repositories/in-memory-product-repository.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    // Core usos de casos para gestionar productos
    // Estos casos de uso son responsables de la lógica de negocio y la interacción con el repositorio
    AddProductUseCase,
    GetProductsUseCase,
    GetProductsByCategoryUseCase,
    
    // Implementación del repositorio en memoria
    // Esta implementación se utiliza para almacenar productos en memoria durante el desarrollo
    InMemoryProductRepositoryAdapter,
    ProductRepositoryFactory,
    
    // Port del repositorio
    // Este puerto define la interfaz que el caso de uso utiliza para interactuar con el repositorio
    {
      provide: ProductRepositoryPort,
      useFactory: (factory: ProductRepositoryFactory) => factory.createInMemory(),
      deps: [ProductRepositoryFactory]
    },
    
    // Servicios de Angular para la detección de cambios y la hidratación del cliente
    // Estos servicios son responsables de optimizar el rendimiento de la aplicación
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration()
  ]
};