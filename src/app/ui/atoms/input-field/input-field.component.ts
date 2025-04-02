import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="input-container">
      <!-- Etiqueta opcional para el campo de entrada -->
      <label *ngIf="label" [for]="id" class="label">{{ label }}</label>

      <!-- Campo de entrada con binding bidireccional -->
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        (input)="onInputChange($event)"
        class="input-field"
      />

      <!-- Mensaje de error opcional -->
      <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    .input-container {
      margin-bottom: 1rem;
    }
    .label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }
    .input-field {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      font-size: 1rem;
    }
    .input-field:focus {
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
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor {
  // Propiedades de entrada configurables
  @Input() id = '';  // Identificador único del campo
  @Input() label = '';  // Etiqueta del campo de entrada
  @Input() type = 'text';  // Tipo de input (text, password, email, etc.)
  @Input() placeholder = '';  // Texto de marcador de posición
  @Input() errorMessage = '';  // Mensaje de error opcional
  @Input() disabled = false;  // Controla si el campo está deshabilitado

  value = ''; // Valor actual del campo

  // Funciones de callback para la integración con formularios reactivos
  onChange: any = () => {};
  onTouched: any = () => {};

  // Escribe un valor en el campo de entrada
  writeValue(value: any): void {
    this.value = value || '';
  }

  // Registra una función que se ejecuta cuando el valor cambia
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registra una función que se ejecuta cuando el campo pierde el foco
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Establece si el campo debe estar deshabilitado
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Método que maneja el cambio de valor en el input
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.writeValue(value); // Actualiza el valor interno
    this.onChange(value); // Notifica el cambio a Angular Forms
    this.onTouched(); // Marca el campo como tocado
  }
}
