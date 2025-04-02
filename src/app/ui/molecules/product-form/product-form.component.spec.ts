import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCreateDTO } from '../../../core/domain/product.model';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { SelectFieldComponent } from '../../atoms/select-field/select-field.component';
import { ProductFormComponent } from './product-form.component';

/**
 * Pruebas unitarias para el componente ProductFormComponent.
 *
 * Este archivo contiene tests para verificar el comportamiento del formulario.
 * Se prueba la inicialización del formulario, la validación de los campos y
 * la emisión del evento cuando los datos son válidos.
 */
describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  /**
   * Configuración inicial del módulo de pruebas.
   * Se importan los módulos y componentes necesarios.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ProductFormComponent,
        InputFieldComponent,
        SelectFieldComponent,
        ButtonComponent
      ]
    }).compileComponents();
  });

  /**
   * Se crea una instancia del componente antes de cada prueba.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el formulario se inicializa en un estado inválido.
   */
  it('Debería inicializar con un formulario inválido', () => {
    expect(component.productForm.valid).toBeFalsy();
  });

  /**
   * Verifica que los campos del formulario sean inválidos cuando están vacíos.
   */
  it('Debería tener controles inválidos al inicio', () => {
    const nameControl = component.productForm.get('name');
    const descriptionControl = component.productForm.get('description');
    const priceControl = component.productForm.get('price');
    const categoryControl = component.productForm.get('category');

    expect(nameControl?.valid).toBeFalsy();
    expect(descriptionControl?.valid).toBeFalsy();
    expect(priceControl?.valid).toBeFalsy();
    expect(categoryControl?.valid).toBeFalsy();
  });

  /**
   * Verifica que el evento se emita correctamente cuando el formulario es válido.
   */
  it('Debería emitir los datos cuando el formulario es válido y se envía', () => {
    spyOn(component.addProduct, 'emit');
    
    const testProduct: ProductCreateDTO = {
      name: 'Test Product',
      description: 'Test Description with enough length',
      price: 50,
      category: 'Books'
    };

    component.productForm.setValue(testProduct);
    expect(component.productForm.valid).toBeTruthy();

    component.onSubmit();
    expect(component.addProduct.emit).toHaveBeenCalledWith(testProduct);
  });

  /**
   * Verifica que no se emita el evento cuando el formulario es inválido.
   */
  it('No debería emitir el evento cuando el formulario es inválido', () => {
    spyOn(component.addProduct, 'emit');

    component.onSubmit();
    expect(component.addProduct.emit).not.toHaveBeenCalled();
  });
});