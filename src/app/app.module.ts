import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProductRepositoryPort } from './core/ports/repositories/product-repository.port';
import { ProductRepositoryFactory } from './infrastructure/factories/product-repository.factory';


import { AddProductUseCase } from './core/usecases/add-product.usecase';
import { GetProductsUseCase } from './core/usecases/get-products.usecase';
import { GetProductsByCategoryUseCase } from './core/usecases/get-products-by-category.usecase';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule
  ],
  providers: [
    // Puertos y adaptadores de infraestructura
    {
      provide: ProductRepositoryPort,
      useFactory: (factory: ProductRepositoryFactory) => factory.createInMemory(),
      deps: [ProductRepositoryFactory]
    },
    // Casos de uso principales para gestionar productos
    AddProductUseCase,
    GetProductsUseCase,
    GetProductsByCategoryUseCase
  ]
})
export class AppModule { }