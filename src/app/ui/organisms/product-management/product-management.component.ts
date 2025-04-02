import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product, ProductCreateDTO } from '../../../core/domain/product.model';
import { AddProductUseCase } from '../../../core/usecases/add-product.usecase';
import { GetProductsByCategoryUseCase } from '../../../core/usecases/get-products-by-category.usecase';
import { GetProductsUseCase } from '../../../core/usecases/get-products.usecase';
import { ProductFormComponent } from '../../molecules/product-form/product-form.component';
import { ProductFilterComponent } from '../../molecules/product-filter/product-filter.component';
import { ProductTableComponent } from '../../molecules/product-table/product-table.component';
import { ProductRepositoryPort } from '../../../core/ports/repositories/product-repository.port';
import { ProductRepositoryFactory } from '../../../infrastructure/factories/product-repository.factory';
import { InMemoryProductRepositoryAdapter } from '../../../infrastructure/adpaters/repositories/in-memory-product-repository.adapter';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductFilterComponent, ProductTableComponent],
  providers: [
    // Casos de uso principales para gestionar productos
    AddProductUseCase,
    GetProductsUseCase,
    GetProductsByCategoryUseCase,
    
    // Implementación del repositorio en memoria
    InMemoryProductRepositoryAdapter,
    ProductRepositoryFactory,
    
    // Proveedor del puerto del repositorio
    {
      provide: ProductRepositoryPort,
      useFactory: (factory: ProductRepositoryFactory) => factory.createInMemory(),
      deps: [ProductRepositoryFactory]
    }
  ],
  template: `
    <div class="product-management">
      <div class="grid-container">
        <div class="form-section">
          <!-- Componente para agregar productos -->
          <app-product-form (addProduct)="onAddProduct($event)"></app-product-form>
        </div>
        
        <div class="list-section">
          <h3 class="section-title">Lista de Productos</h3>
          <!-- Filtro de productos por categoría -->
          <app-product-filter (filterChange)="onFilterChange($event)"></app-product-filter>
          
          <!-- Tabla de productos con manejo de lista vacía -->
          <ng-container *ngIf="products$ | async as productList; else emptyProducts">
            <app-product-table [products]="productList"></app-product-table>
          </ng-container>
          
          <ng-template #emptyProducts>
            <app-product-table [products]="[]"></app-product-table>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-management {
      padding: 2rem 0;
    }
    .grid-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .grid-container {
        grid-template-columns: 1fr 1fr;
      }
    }
    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
  `]
})
export class ProductManagementComponent implements OnInit {
  // Observable que almacena la lista de productos
  products$: Observable<Product[]>;
  currentCategory = '';
  
  constructor(
    private addProductUseCase: AddProductUseCase,
    private getProductsUseCase: GetProductsUseCase,
    private getProductsByCategoryUseCase: GetProductsByCategoryUseCase
  ) {
    // Cargar productos al inicializar el componente
    this.products$ = this.getProductsUseCase.execute();
  }
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  // Maneja el evento de agregar un nuevo producto
  onAddProduct(product: ProductCreateDTO): void {
    this.addProductUseCase.execute(product).subscribe(() => {
      this.loadProducts(); // Recargar la lista después de agregar
    });
  }
  
  // Maneja el evento de filtro por categoría
  onFilterChange(category: string): void {
    this.currentCategory = category;
    this.loadProducts();
  }
  
  // Carga productos según la categoría seleccionada
  private loadProducts(): void {
    if (this.currentCategory) {
      this.products$ = this.getProductsByCategoryUseCase.execute(this.currentCategory);
    } else {
      this.products$ = this.getProductsUseCase.execute();
    }
  }
}