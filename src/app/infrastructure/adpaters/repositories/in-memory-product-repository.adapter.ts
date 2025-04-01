import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductCategory,ProductCreateDTO } from "../../../core/domain/product.model";
import { ProductRepositoryPort } from "../../../core/ports/repositories/product-repository.port";


@Injectable()

//**
// Esta clase es una implementacion de la interfaz ProductRepositoryPort
// y es la que se usa para acceder a los productos de la base de datos
// y se usa en los casos de uso. Se usa para definir los métodos que se usan
// */
export class InMemoryProductRepositoryAdapter implements ProductRepositoryPort {
    private products: Product[] = [
        {
            id: '1',
            name: 'Macbook Pro 16',
            description: 'Potentente laptop de Apple',
            price: 1300.9,
            category: ProductCategory.ELECTRONICS
        },

        {
            id : '2',
            name: '100 años de soledad',
            description: 'Libro de Gabriel Garcia Marquez',
            price: 20.5,
            category: ProductCategory.BOOKS
        },

        {
            id: '3',
            name: 'Realme 12',
            description: 'Celular de gama media',
            price: 300.5,
            category: ProductCategory.ELECTRONICS
        },

        {
            id: '4',
            name: 'Camiseta de futbol',
            description: 'Camiseta de la seleccion nacional',
            price: 50.5,
            category: ProductCategory.CLOTHING
        },

        {
            id: '5',
            name: 'Pizza',
            description: 'Pizza de pepperoni',
            price: 10.5,
            category: ProductCategory.FOOD
        }
    ];

    // Este metodo se encarga de obtener todos los productos de la base de datos
    getAll(): Observable<Product[]> {
        return of([...this.products]);
      }

      //Este metodo se encarga de obtener los productos por categoria de la base de datos
    
      getByCategory(category: string): Observable<Product[]> {
        const filteredProducts = this.products.filter(product => 
          product.category === category
        );
        return of(filteredProducts);
      }
    

      // Este metodo se encarga de agregar un nuevo producto a la base de datos
      
      add(productDto: ProductCreateDTO): Observable<Product> {
        const newProduct: Product = {
          ...productDto,
          id: uuidv4()
        };
        
        this.products.push(newProduct);
        return of(newProduct);
      }
    }