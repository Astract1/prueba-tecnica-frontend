import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCategory, ProductCreateDTO } from '../../../core/domain/product.model';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { SelectFieldComponent } from '../../atoms/select-field/select-field.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputFieldComponent,
    SelectFieldComponent,
    ButtonComponent
  ],
  template: `
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="product-form">
      <h3 class="form-title">Agregar Nuevo Producto</h3>
      
      <app-input-field
        id="name"
        label="Nombre"
        formControlName="name"
        placeholder="Nombre del producto"
        [errorMessage]="getErrorMessage('name')"
      ></app-input-field>
      
      <app-input-field
        id="description"
        label="Descripción"
        formControlName="description"
        placeholder="Descripción del producto"
        [errorMessage]="getErrorMessage('description')"
      ></app-input-field>
      
      <app-input-field
        id="price"
        type="number"
        label="Precio"
        formControlName="price"
        placeholder="Precio del producto"
        [errorMessage]="getErrorMessage('price')"
      ></app-input-field>
      
      <app-select-field
        id="category"
        label="Categoría"
        formControlName="category"
        placeholder="Seleccione una categoría"
        [options]="categoryOptions"
        [errorMessage]="getErrorMessage('category')"
      ></app-select-field>
      
      <div class="form-actions">
        <app-button
          label="Agregar Producto"
          [disabled]="productForm.invalid"
          (onClick)="onSubmit()"
        ></app-button>
      </div>
    </form>
  `,
  styles: [`
    .product-form {
      background-color: #ffffff;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
    .form-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
    .form-actions {
      margin-top: 1.5rem;
    }
  `]
})
export class ProductFormComponent {
  @Output() addProduct = new EventEmitter<ProductCreateDTO>();
  
  productForm: FormGroup;
  
  categoryOptions = [
    { value: ProductCategory.ELECTRONICS, label: 'Electrónica' },
    { value: ProductCategory.BOOKS, label: 'Libros' },
    { value: ProductCategory.CLOTHING, label: 'Ropa' },
    { value: ProductCategory.FOOD, label: 'Alimentos' }
  ];
  
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required]
    });
  }
  
  getErrorMessage(field: string): string {
    if (!this.productForm.get(field)?.errors || 
        !this.productForm.get(field)?.touched) {
      return '';
    }
    
    const errors = this.productForm.get(field)?.errors;
    
    if (errors?.['required']) {
      return 'Este campo es requerido';
    }
    
    if (errors?.['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    }
    
    if (errors?.['min']) {
      return `El valor debe ser mayor a ${errors['min'].min}`;
    }
    
    return 'Valor inválido';
  }
  
  onSubmit(): void {
    if (this.productForm.valid) {
      this.addProduct.emit(this.productForm.value);
      this.productForm.reset({
        name: '',
        description: '',
        price: 0,
        category: ''
      });
    } else {
      this.markFormGroupTouched(this.productForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}