import { Component } from '@angular/core';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';


// Este componente es el punto de entrada de la aplicación Angular.
// Se encarga de cargar el componente principal de la aplicación, que es el componente de productos.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductPageComponent],
  template: `<app-product-page></app-product-page>`,
  styles: []
})
export class AppComponent {
  title = 'prueba-tecnica-frontend';
}