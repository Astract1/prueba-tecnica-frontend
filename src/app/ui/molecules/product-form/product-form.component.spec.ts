// src/app/ui/molecules/product-form/product-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCreateDTO } from '../../../core/domain/product.model';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputFieldComponent } from '../../atoms/input-field/input-field.component';
import { SelectFieldComponent } from '../../atoms/select-field/select-field.component';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductFormComponent,
        InputFieldComponent,
        SelectFieldComponent,
        ButtonComponent
      ],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.productForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const nameControl = component.productForm.get('name');
    const descriptionControl = component.productForm.get('description');
    const priceControl = component.productForm.get('price');
    const categoryControl = component.productForm.get('category');

    nameControl?.setValue('');
    descriptionControl?.setValue('');
    priceControl?.setValue(0);
    categoryControl?.setValue('');

    expect(nameControl?.valid).toBeFalsy();
    expect(descriptionControl?.valid).toBeFalsy();
    expect(priceControl?.valid).toBeFalsy();
    expect(categoryControl?.valid).toBeFalsy();
  });

  it('should emit product data when form is valid and submitted', () => {
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

  it('should not emit when form is invalid', () => {
    spyOn(component.addProduct, 'emit');
    
    // Form is invalid by default
    component.onSubmit();
    expect(component.addProduct.emit).not.toHaveBeenCalled();
  });
});