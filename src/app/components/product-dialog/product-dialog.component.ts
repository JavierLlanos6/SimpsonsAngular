import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ProductDialogComponent {

    form: any;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            price: [0, [Validators.required, Validators.min(1)]],
            description: ['', [Validators.required]],
            category: ['', [Validators.required]]
        });

        if (data) {
            this.form.patchValue(data);
        }
    }

    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}