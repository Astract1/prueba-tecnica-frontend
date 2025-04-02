import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [disabled]="disabled"
      [ngClass]="buttonClass"
      (click)="onClick.emit($event)"
      type="button"
    >
      {{ label }}
    </button>
  `,
  styles: [`
    button {
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .primary {
      background-color: #3b82f6;
      color: white;
      border: none;
    }
    .primary:hover:not(:disabled) {
      background-color: #2563eb;
    }
    .secondary {
      background-color: white;
      color: #1f2937;
      border: 1px solid #d1d5db;
    }
    .secondary:hover:not(:disabled) {
      background-color: #f3f4f6;
    }
  `]
})
export class ButtonComponent {
  // Texto del botón
  @Input() label = '';

  // Define si el botón está deshabilitado
  @Input() disabled = false;

  // Variante del botón (estilo CSS: 'primary' o 'secondary')
  @Input() variant: 'primary' | 'secondary' = 'primary';

  // Evento que se emite cuando el botón es presionado
  @Output() onClick = new EventEmitter<Event>();

  // Método para obtener la clase CSS correspondiente al tipo de botón
  get buttonClass(): string {
    return this.variant;
  }
}
