import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductCreateDTO } from '../../../core/domain/product.model';
import { AddProductUseCase } from '../../../core/usecases/add-product.usecase';
import { GetProductsByCategoryUseCase } from '../../../core/usecases/get-products-by-category.usecase';
import { GetProductsUseCase } from '../../../core/usecases/get-products.usecase';

@Component({
  selector: 'app-product-management',
  template: `
    <div class="product-management">
      <div class="grid-container">
        <div class="form-section">
          <app-product-form (addProduct)="onAddProduct($event)"></app-product-form>
        </div>
        
        <div class="list-section">
          <h3 class="section-title">Lista de Productos</h3>
          <app-product-filter (filterChange)="onFilterChange($event)"></app-product-filter>
          <app-product-table [products]="products$ | async"></app-product-table>
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
  products$: Observable<Product[]>;
  currentCategory = '';
  
  constructor(
    private addProductUseCase: AddProductUseCase,
    private getProductsUseCase: GetProductsUseCase,
    private getProductsByCategoryUseCase: GetProductsByCategoryUseCase
  ) {
    this.products$ = this.getProductsUseCase.execute();
  }
  
  ngOnInit(): void {
    this.loadProducts();
  }
  
  onAddProduct(product: ProductCreateDTO): void {
    this.addProductUseCase.execute(product).subscribe(() => {
      this.loadProducts();
    });
  }
  
  onFilterChange(category: string): void {
    this.currentCategory = category;
    this.loadProducts();
  }
  
  private loadProducts(): void {
    if (this.currentCategory) {
      this.products$ = this.getProductsByCategoryUseCase.execute(this.currentCategory);
    } else {
      this.products$ = this.getProductsUseCase.execute();
    }
  }
}
