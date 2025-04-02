import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/domain/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <table class="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products || []">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price | currency }}</td>
            <td>{{ product.category }}</td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="!products || products.length === 0" class="empty-state">
        No hay productos disponibles.
      </div>
    </div>
  `,
  styles: [`
    .table-container {
      background-color: #ffffff;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .product-table {
      width: 100%;
      border-collapse: collapse;
    }
    .product-table th, .product-table td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    .product-table th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #4b5563;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    .product-table tr:hover {
      background-color: #f9fafb;
    }
    .empty-state {
      padding: 2rem;
      text-align: center;
      color: #6b7280;
    }
  `]
})
export class ProductTableComponent {
  @Input() products: Product[] | null = [];
}