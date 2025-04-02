import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from '../../organisms/product-management/product-management.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductManagementComponent],
  template: `
    <div class="page-container">
      <!-- Encabezado de la página -->
      <header class="header">
        <div class="container">
          <h1 class="app-title">Gestión de Productos</h1>
          <p class="app-subtitle">Administra tu catálogo de productos con facilidad</p>
        </div>
      </header>
      
      <!-- Contenido principal que incluye la gestión de productos -->
      <main class="main-content">
        <div class="container">
          <app-product-management></app-product-management>
        </div>
      </main>
      
      <!-- Pie de página o Footer -->
      <footer class="footer">
        <div class="container">
          <p>Prueba de modulo</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f3f4f6;
    }
    .header {
      background-color: #1f2937;
      color: white;
      padding: 2rem 0;
    }
    .app-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .app-subtitle {
      font-size: 1.125rem;
      opacity: 0.8;
    }
    .main-content {
      flex: 1;
    }
    .footer {
      background-color: #1f2937;
      color: white;
      padding: 1.5rem 0;
      font-size: 0.875rem;
      opacity: 0.7;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  `]
})
export class ProductPageComponent {}
