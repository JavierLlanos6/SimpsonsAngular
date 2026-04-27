import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../features/characters/services/api/api";
import { RouterLink } from "@angular/router";
import { Product } from "./products/product.model";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { createProductForm } from "./forms/prodducto-forms";

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: './prueba.html',
})
export class PruebaCrudClass implements OnInit {
    editingProductId: number | null = null;
    products: Product[] = [];
    loading = true;

    constructor(
        private api: ApiService,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder
    ) {}

    showForm = false;
    newProduct: Omit<Product, 'id'> = {
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '' 
    };

    //validaciones:
    productForm!: any;
    ngOnInit(): void {
    this.initForm();
    this.getProducts();
    }

    initForm() {
        this.productForm = createProductForm(this.fb);
    }

    toggleForm() {
        this.showForm = !this.showForm;
    }

    saveProduct() {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            return;
        }

        const formValue = this.productForm.value;

        const safeProduct = {
            title: formValue.title ?? '',
            price: formValue.price ?? 0,
            description: formValue.description ?? '',
            category: formValue.category ?? '',
        };

        if (this.editingProductId) {
            // EDITAR
            const updatedProduct: Product = {
                id: this.editingProductId,
                ...safeProduct,
                image: ''
            };

            this.products = this.products.map(p =>
                p.id === this.editingProductId ? updatedProduct : p
            );

            const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
            const updatedLocal = localProducts.map((p: Product) =>
            p.id === this.editingProductId ? updatedProduct : p
            );

            localStorage.setItem('products', JSON.stringify(updatedLocal));

            this.editingProductId = null;

        } else {
            // CREAR
            const newProduct: Product = {
                id: Date.now(),
                ...safeProduct,
                image: ''
            };

            this.products.unshift(newProduct);

            const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
            localProducts.unshift(newProduct);
            localStorage.setItem('products', JSON.stringify(localProducts));
        }

        this.productForm.reset();
        this.showForm = false;
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

    editProduct(product: Product) {
        this.editingProductId = product.id;
        this.productForm.patchValue({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category
        });
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