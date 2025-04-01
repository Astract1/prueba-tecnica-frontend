import { Component } from '@angular/core';

@Component({
  selector: 'app-product-page',
  template: `
    <div class="page-container">
      <header class="header">
        <div class="container">
          <h1 class="app-title">Gestión de Productos</h1>
          <p class="app-subtitle">Administra tu catálogo de productos con facilidad</p>
        </div>
      </header>
      
      <main class="main-content">
        <div class="container">
          <app-product-management></app-product-management>
        </div>
      </main>
      
      <footer class="footer">
        <div class="container">
          <p>© 2025 - Aplicación de Gestión de Productos con Arquitectura Hexagonal</p>
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