import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Core - UseCases
import { AddProductUseCase } from './core/usecases/add-product.usecase';
import { GetProductsUseCase } from './core/usecases/get-products.usecase';
import { GetProductsByCategoryUseCase } from './core/usecases/get-products-by-category.usecase';

// Infrastructure
import { ProductRepositoryPort } from './core/ports/repositories/product-repository.port';
import { ProductRepositoryFactory } from './infrastructure/factories/product-repository.factory';

// UI - Atoms
import { ButtonComponent } from './ui/atoms/button/button.component';
import { InputFieldComponent } from './ui/atoms/input-field/input-field.component';
import { SelectFieldComponent } from './ui/atoms/select-field/select-field.component';

// UI - Molecules
import { ProductFormComponent } from './ui/molecules/product-form/product-form.component';
import { ProductFilterComponent } from './ui/molecules/product-filter/product-filter.component';
import { ProductTableComponent } from './ui/molecules/product-table/product-table.component';

// UI - Organisms & Pages
import { ProductManagementComponent } from './ui/organisms/product-management/product-management.component';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    // Atoms
    ButtonComponent,
    InputFieldComponent,
    SelectFieldComponent,
    // Molecules
    ProductFormComponent,
    ProductFilterComponent,
    ProductTableComponent,
    // Organisms
    ProductManagementComponent,
    // Pages
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // Ports & Adapters
    {
      provide: ProductRepositoryPort,
      useFactory: (factory: ProductRepositoryFactory) => factory.createInMemory(),
      deps: [ProductRepositoryFactory]
    },
    // Use Cases
    AddProductUseCase,
    GetProductsUseCase,
    GetProductsByCategoryUseCase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }