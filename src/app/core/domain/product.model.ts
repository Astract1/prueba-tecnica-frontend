// Este archivo define el modelo de datos para los productos en la aplicación.

export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }
  
  // DTO para la creación de un nuevo producto
  // Se usa para crear un nuevo producto en la base de datos
  export type ProductCreateDTO = Omit<Product, 'id'>;
  
  // Categorías de productos disponibles (Enum)
  export enum ProductCategory {
    ELECTRONICS = 'Electronicos',
    BOOKS = 'Libros',
    CLOTHING = 'Ropa',
    FOOD = 'Comida'
  }