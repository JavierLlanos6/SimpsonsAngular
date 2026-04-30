import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../../prueba/products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'https://fakestoreapi.com/products';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    createProduct(product: Omit<Product, 'id'>): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }

    updateProduct(id: number, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}