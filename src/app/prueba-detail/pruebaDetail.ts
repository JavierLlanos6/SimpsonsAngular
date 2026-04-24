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

        this.api.getProductById(id).subscribe({
        next: (data) => {
            console.log('DETAIL:', data);
            this.product = data;
            this.loading = false;
            this.cdr.detectChanges();
        },
        error: () => {
            this.loading = false;
            this.cdr.detectChanges();
        }
        });
    }
}