import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCategory } from '../../../core/domain/product.model';
import { SelectFieldComponent } from '../../atoms/select-field/select-field.component';

//**
// Este componente permite filtrar productos por categoría.
// Utiliza un campo de selección que emite un evento cuando el usuario cambia la categoría.
//**
@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectFieldComponent],
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
  @Output() filterChange = new EventEmitter<string>(); // Evento que emite el valor de la categoría seleccionada
  
  categoryControl = new FormControl(''); // Campo de formulario para seleccionar la categoría
  
  categoryOptions = [ // Opciones disponibles para la selección de categorías
    { value: '', label: 'Todas las Categorías' },
    { value: ProductCategory.ELECTRONICS, label: 'Electrónica' },
    { value: ProductCategory.BOOKS, label: 'Libros' },
    { value: ProductCategory.CLOTHING, label: 'Ropa' },
    { value: ProductCategory.FOOD, label: 'Alimentos' }
  ];
  
  //**
  // Suscripción a cambios en el campo de selección.
  // Cada vez que el usuario cambia la categoría, se emite un evento con el nuevo valor.
  //**
  ngOnInit() {
    this.categoryControl.valueChanges.subscribe(value => {
      this.filterChange.emit(value || '');
    });
  }
}
