import { FormBuilder, Validators } from '@angular/forms';

export function createProductForm(validationAddProduct: FormBuilder) {
  return validationAddProduct.group({
    title: [
        '',
        [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern('^[a-zA-Z0-9 ]*$')
        ]
    ],
    price: [
        0,
        [
            Validators.required,
            Validators.min(1),
            Validators.max(10000)
        ]
    ],
    description: [
        '',
        [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(200)
        ]
    ],
    category: [
        '',
        [
            Validators.required,
            Validators.minLength(3)
        ]
    ]
  });
}