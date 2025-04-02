import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="select-container">
      <!-- Etiqueta del campo de selección (opcional) -->
      <label *ngIf="label" [for]="id" class="label">{{ label }}</label>
      
      <!-- Menú desplegable con opciones dinámicas -->
      <select
        [id]="id"
        [value]="value"
        [disabled]="disabled"
        (change)="onSelectChange($event)"
        class="select-field"
      >
        <!-- Opción por defecto si se proporciona un placeholder -->
        <option value="" *ngIf="placeholder">{{ placeholder }}</option>
        
        <!-- Iteración sobre la lista de opciones -->
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Mensaje de error opcional -->
      <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    .select-container {
      margin-bottom: 1rem;
    }
    .label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }
    .select-field {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      font-size: 1rem;
      background-color: white;
    }
    .select-field:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true
    }
  ]
})
export class SelectFieldComponent implements ControlValueAccessor {
  // Propiedades de entrada para configurar el componente
  @Input() id = '';  // Identificador único del campo
  @Input() label = '';  // Texto de la etiqueta
  @Input() placeholder = '';  // Texto de marcador de posición
  @Input() options: { value: string; label: string }[] = [];  // Lista de opciones disponibles
  @Input() errorMessage = '';  // Mensaje de error a mostrar
  @Input() disabled = false;  // Estado de habilitado/deshabilitado

  value = ''; // Valor seleccionado en el campo

  // Funciones de callback para la comunicación con formularios reactivos
  onChange: any = () => {};
  onTouched: any = () => {};

  // Método para escribir el valor en el campo (implementado desde ControlValueAccessor)
  writeValue(value: any): void {
    this.value = value || '';
  }

  // Método para registrar una función que se ejecutará cuando el valor cambie
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Método para registrar una función que se ejecutará cuando el campo pierda el foco
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Método para establecer si el campo debe estar deshabilitado
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Método ejecutado cuando el usuario selecciona una opción
  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.writeValue(value); // Actualiza el valor localmente
    this.onChange(value); // Notifica el cambio a Angular Forms
    this.onTouched(); // Marca el campo como tocado
  }
}
