import { Injectable } from "@angular/core";
import { InMemoryProductRepositoryAdapter } from "../adpaters/repositories/in-memory-product-repository.adapter";
import { ProductRepositoryPort } from "../../core/ports/repositories/product-repository.port";

/**
 * Servicio que proporciona métodos para crear instancias de repositorios de productos.
 * Actualmente, ofrece métodos para crear repositorios en memoria y basados en HTTP.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryFactory {
  /**
   * Crea una instancia del repositorio de productos en memoria.
   */
  createInMemory(): ProductRepositoryPort {
    return new InMemoryProductRepositoryAdapter();
  }

  /**
   * Crea una instancia del repositorio de productos basado en HTTP.
   * Actualmente, este método devuelve una instancia en memoria como marcador de posición.
   */
  createHttp(): ProductRepositoryPort {
    return new InMemoryProductRepositoryAdapter(); 
  }
}
