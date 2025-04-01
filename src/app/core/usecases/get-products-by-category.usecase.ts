import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../domain/product.model";
import { ProductRepositoryPort } from "../ports/repositories/product-repository.port";

@Injectable()

// Este caso de uso se encarga de obtener todos los productos de la base de datos
// y de devolverlos. Se usa en el componente de productos
export class GetProductsByCategoryUseCase {
    constructor(private productRepository: ProductRepositoryPort) {}

    execute(category: string): Observable<Product[]> {
        return this.productRepository.getByCategory(category);
    }
}