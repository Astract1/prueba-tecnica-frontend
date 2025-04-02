import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductPageComponent } from './ui/pages/product-page/product-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Este archivo contiene las pruebas unitarias para el componente principal de la aplicación Angular.
// Se encarga de verificar que el componente se crea correctamente y que tiene el título esperado.
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite ignorar elementos personalizados no reconocidos
    }).compileComponents();
  });

  // Este Componente es el punto de entrada de la aplicación Angular.
  // Se encarga de cargar el componente principal de la aplicación, que es el componente de productos.
  it('Crea la App', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Pone el titulo 'prueba-tecnica-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('prueba-tecnica-frontend');
  });

  // Este test necesita ser actualizado ya que el componente no renderiza el título directamente
  // sino que renderiza el ProductPageComponent
  it('Debe cargar el componente ProductPage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verifica que exista el selector del ProductPageComponent
    const productPageElement = compiled.querySelector('app-product-page');
    expect(productPageElement).toBeTruthy();
  });
});