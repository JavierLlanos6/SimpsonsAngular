import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../features/characters/services/api/api";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prueba.html',
})
export class PruebaCrudClass implements OnInit {

    products: any[] = [];
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
            next: (data) => {
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
            next: (res) => {
            console.log('ELIMINADO Producto eliminado correctamente:', res);
            this.getProducts();
            },
            error: (err) => {
            console.error('AAAHHHHHH error:', err);
            }
        });
    }

    viewProduct(id: number) {
        this.api.getProductById(id).subscribe((data) => {
            console.log('DETALLE:', data);
            alert(`Producto: ${data.title}`);
        });
    }

    editProduct(product: any) {
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
        const newProduct = {
            title: 'PRODUCTO NUEVO',
            price: 100000,
            description: 'Esto es una prueba para crear un producto',
            image: 'https://ayudaaaa.jpg',
            category: 'Electronico'
        };

        this.api.createProduct(newProduct).subscribe((res) => {
            console.log('Respuesta API:', res);
            this.products.unshift(res); 
        });
    }
}