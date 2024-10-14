import {Component} from '@angular/core';
import {CartService} from "../products/data-access/cart.service";
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {DataViewModule} from "primeng/dataview";
import {PrimeTemplate} from "primeng/api";
import {Product} from "../products/data-access/product.model";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    Button,
    CardModule,
    DataViewModule,
    PrimeTemplate
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  public cartProducts: any[] | undefined;

  constructor(private cartService: CartService){}

  ngOnInit(){
    this.cartService.cartProducts$.subscribe(res => this.cartProducts = res)
  }

  public onDelete(product: Product){
     let newCartProducts: any[];
     // @ts-ignore
    newCartProducts = this.cartProducts?.filter(c => c != product);
    this.cartService.changeCartProducts(newCartProducts);
    localStorage.setItem("cart",JSON.stringify(newCartProducts));
  }
}
