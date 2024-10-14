import {Component, EventEmitter, input, Output} from '@angular/core';
import {PrimeTemplate} from "primeng/api";
import {RouterOutlet} from "@angular/router";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {Product} from "../../data-access/product.model";
import {ImageModule} from "primeng/image";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    PrimeTemplate,
    RouterOutlet,
    Button,
    CardModule,
    ImageModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  @Output() cancel = new EventEmitter<void>();

  public readonly product = input.required<Product>();

  onCancel() {
    this.cancel.emit();
  }
}
