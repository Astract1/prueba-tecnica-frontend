import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Este archivo contiene las pruebas unitarias para el componente principal de la aplicación Angular.
// Se encarga de verificar que el componente se crea correctamente y que tiene el título esperado.
// También verifica que el título se renderiza correctamente en la plantilla HTML.

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  // Este Componente es el punto de entrada de la aplicación Angular.
  // Se encarga de cargar el componente principal de la aplicación, que es el componente de productos.
  it('Crea la App', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Pone el titulo 'Prueba-tecnica-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('prueba-tecnica-frontend');
  });

  it('Renderiza el titulo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hola, prueba-tecnica-frontend');
  });
});
