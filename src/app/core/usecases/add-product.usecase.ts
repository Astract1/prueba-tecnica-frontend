import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../domain/product.model";
import { ProductRepositoryPort } from "../ports/repositories/product-repository.port";



// Este caso de uso se encarga de agregar un producto a la base de datos
// y de devolver el producto agregado. Se usa en el componente de agregar producto
@Injectable()

export class AddProductUseCase {
    constructor(private productRepository: ProductRepositoryPort) {}

    execute(product: Product): Observable<Product> {
        return this.productRepository.add(product);
    }

}

