import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../features/characters/services/api/api";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pruebaDetail.html',
})
export class PruebaDetailComponent implements OnInit {

    product: any;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        // localStorage
        const localProducts: any[] = JSON.parse(localStorage.getItem('products') || '[]');
        const localProduct = localProducts.find(prod => prod.id === id);

        if (localProduct) {
            console.log('[DETAIL LOCAL]:', localProduct);

            this.product = localProduct;
            this.loading = false;
            this.cdr.detectChanges();
            return; // esto es para que no vaya a la API y se rompa :v
        }

        // API
        this.api.getProductById(id).subscribe({
            next: (data) => {
                console.log('[DETAIL API]:', data);
                this.product = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('ERROR DETAIL:', err);
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }
}