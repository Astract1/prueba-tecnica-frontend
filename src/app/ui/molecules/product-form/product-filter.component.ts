import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductCategory } from '../../../core/domain/product.model';

@Component({
  selector: 'app-product-filter',
  template: `
    <div class="filter-container">
      <app-select-field
        id="categoryFilter"
        label="Filtrar por Categoría"
        [formControl]="categoryControl"
        [options]="categoryOptions"
      ></app-select-field>
    </div>
  `,
  styles: [`
    .filter-container {
      margin-bottom: 1.5rem;
    }
  `]
})
export class ProductFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string>();
  
  categoryControl = new FormControl('');
  
  categoryOptions = [
    { value: '', label: 'Todas las Categorías' },
    { value: ProductCategory.ELECTRONICS, label: 'Electrónica' },
    { value: ProductCategory.BOOKS, label: 'Libros' },
    { value: ProductCategory.CLOTHING, label: 'Ropa' },
    { value: ProductCategory.FOOD, label: 'Alimentos' }
  ];
  
  ngOnInit() {
    this.categoryControl.valueChanges.subscribe(value => {
      this.filterChange.emit(value || '');
    });
  }
}