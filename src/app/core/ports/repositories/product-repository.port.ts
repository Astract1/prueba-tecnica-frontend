import { Observable } from "rxjs";
import { Product, ProductCreateDTO } from "../../domain/product.model";


/// Esta interfaz es la que se usa para acceder a los productos de la base de datos
// y se usa en los casos de uso. Se usa para definir los métodos que se usan
// para acceder a los productos de la base de datos. Se usa en el componente de productos.
export abstract class ProductRepositoryPort {
    abstract getAll(): Observable<Product[]>;
    abstract getByCategory(category: string): Observable<Product[]>;
    abstract add(product: ProductCreateDTO): Observable<Product>;

}
