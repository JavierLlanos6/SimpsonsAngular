import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../features/characters/services/api/api";
import { RouterLink } from "@angular/router";
import { Product } from "./products/product.model";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prueba.html',
})
export class PruebaCrudClass implements OnInit {

    products: Product[] = [];
    loading = true;

    constructor(
        private api: ApiService,
        private cdr: ChangeDetectorRef
    ) {}


    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.loading = true;

        this.api.getProducts().subscribe({
            next: (data: Product[]) => {
                console.log('PRODUCTS:', data);

                this.products = data;
                this.loading = false;

                this.cdr.detectChanges(); 
            },
            error: (err) => {
                console.error('ERROR:', err);
                this.loading = false;

                this.cdr.detectChanges(); 
            }
        });
    }

    deleteProduct(id: number) {
        this.api.deleteProduct(id).subscribe({
            next: () => {
            console.log('ELIMINADO Producto eliminado correctamente:', id);
            //this.getProducts();
            this.products = this.products.filter(p => p.id !== id);
            },
            error: (err) => {
            console.error('AAAHHHHHH error:', err);
            }
        });
    }

    viewProduct(id: number) {
        this.api.getProductById(id).subscribe((data: Product) => {
            console.log('DETALLE:', data);
            alert(`Producto: ${data.title}`);
        });
    }

    editProduct(product: Product) {
        console.log('Producto original:', product);

        const updated = {
            ...product,
            title: product.title + ' AYUDAAAAAAAAAA'
        };

        this.api.updateProduct(product.id, updated).subscribe({
            next: (res) => {
            console.log('Producto ACTUALIZADO correctamente:', res);
            this.getProducts();
            },
            error: (err) => {
            console.error('ERROOOOR al querre actualizar:', err);
            }
        });
    }

    createFakeProduct() {
        const newProduct: Omit<Product, 'id'> =  {
            title: 'PRODUCTO NUEVO',
            price: 100000,
            description: 'Esto es una prueba para crear un producto',
            image: 'https://ayudaaaa.jpg',
            category: 'Electronico'
        };

        this.api.createProduct(newProduct).subscribe((res: Product) => {
            console.log('Respuesta API:', res);
            this.products.unshift(res); 
        });
    }
}