import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../features/characters/services/api/api";
import { RouterLink } from "@angular/router";
import { Product } from "./products/product.model";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './prueba.html',
})
export class PruebaCrudClass implements OnInit {

    editingProductId: number | null = null;

    products: Product[] = [];
    loading = true;

    constructor(
        private api: ApiService,
        private cdr: ChangeDetectorRef
    ) {}

    showForm = false;
    newProduct: Omit<Product, 'id'> = {
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '' 
    };

    toggleForm() {
        this.showForm = !this.showForm;
    }

    /*addLocalProduct() {
        const product: Product = {
            id: Date.now(),
            ...this.newProduct,
            image: ''
        };

        console.log('[LOCAL CREATE]:', product);

        // guardar en memoria
        this.products.unshift(product);

        // guardar en localStorage
        const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
        localProducts.unshift(product);

        localStorage.setItem('products', JSON.stringify(localProducts));

        // reset
        this.newProduct = {
            title: '',
            price: 0,
            description: '',
            category: '',
            image: ''
        };

        this.showForm = false;
    }*/

    saveProduct() {
        if (this.editingProductId) {
            const updatedProduct: Product = {
            id: this.editingProductId,
            ...this.newProduct
            };

            console.log('CREANDO DE MANERA LOCAL:', updatedProduct);

            // actualizar lista
            this.products = this.products.map(p =>
            p.id === this.editingProductId ? updatedProduct : p
            );

            // actualizar localStorage
            const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
            const updatedLocal = localProducts.map((p: Product) =>
            p.id === this.editingProductId ? updatedProduct : p
            );

            localStorage.setItem('products', JSON.stringify(updatedLocal));

            this.editingProductId = null;

        } else {
            const product: Product = {
            id: Date.now(),
            ...this.newProduct,
            image: ''
            };

            console.log('CREANDO local:', product);

            this.products.unshift(product);

            const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
            localProducts.unshift(product);
            localStorage.setItem('products', JSON.stringify(localProducts));
        }

        this.newProduct = {
            title: '',
            price: 0,
            description: '',
            category: '',
            image: ''
        };

        this.showForm = false;
    }


    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.loading = true;

        this.api.getProducts().subscribe({
            next: (data: Product[]) => {

            // obtener localStorage
            const localProducts = JSON.parse(localStorage.getItem('products') || '[]');

            // combinar local con api
            this.products = [...localProducts, ...data];

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
        this.products = this.products.filter(p => p.id !== id);

        const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const updated = localProducts.filter((p: Product) => p.id !== id);

        localStorage.setItem('products', JSON.stringify(updated));

        console.log('Eliminado localmente:', id);
    }

    viewProduct(id: number) {
        this.api.getProductById(id).subscribe((data: Product) => {
            console.log('DETALLE:', data);
            alert(`Producto: ${data.title}`);
        });
    }

    /**editProduct(product: Product) {
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
    }*/
   editProduct(product: Product) {
        this.editingProductId = product.id;

        this.newProduct = {
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
        };

        this.showForm = true;
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