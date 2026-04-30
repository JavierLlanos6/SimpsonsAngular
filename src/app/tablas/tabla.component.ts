import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../features/characters/services/api/api';
import { Product } from '../prueba/products/product.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDialogComponent } from '../components/product-dialog/product-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone: true,
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule, 
    MatDialogModule, 
    MatTooltipModule
  ]
})
export class TablaComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['image', 'title', 'description', 'price', 'actions'];

    dataSource = new MatTableDataSource<Product>([]);
    allData: Product[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private api: ApiService, private dialog: MatDialog) {}

    

    ngOnInit() {
        this.loadProducts();
    }

    
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    loadProducts() {
        this.api.getProducts().subscribe((apiData: Product[]) => {

        const localProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');

        this.allData = [...localProducts, ...apiData];

        this.dataSource.data = this.allData;
        });
    }

    // 🔍 FILTRO
    applyFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase();

        this.dataSource.data = this.allData.filter(p =>
        p.title.toLowerCase().includes(value) ||
        p.description.toLowerCase().includes(value)
        );
    }

    deleteProduct(id: number) {
        this.allData = this.allData.filter(p => p.id !== id);
        this.dataSource.data = this.allData;

        const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const updated = localProducts.filter((p: Product) => p.id !== id);
        localStorage.setItem('products', JSON.stringify(updated));
    }

    editProduct(product: Product) {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            width: '400px',
            data: product
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return;

            const updatedProduct: Product = {
                ...product,
                ...result
            };

            // actualizar lista
            this.allData = this.allData.map(p =>
                p.id === product.id ? updatedProduct : p
            );

            this.dataSource.data = this.allData;

            // actualizar localStorage
            const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
            const updatedLocal = localProducts.map((p: Product) =>
                p.id === product.id ? updatedProduct : p
            );

            localStorage.setItem('products', JSON.stringify(updatedLocal));
        });
    }

    addProduct() {

        const dialogRef = this.dialog.open(ProductDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return;

            const newProduct: Product = {
                id: Date.now(),
                ...result,
                image: ''
            };

            // guardar
            this.allData.unshift(newProduct);
            this.dataSource.data = this.allData;

            const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
            localProducts.unshift(newProduct);
            localStorage.setItem('products', JSON.stringify(localProducts));
        });
    }
    truncate(text: string, limit: number): string {
  if (!text) return '';
  return text.length > limit ? text.substring(0, limit) + '...' : text;
}
    
}