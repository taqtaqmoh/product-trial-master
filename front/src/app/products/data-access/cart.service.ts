import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartProducts = new BehaviorSubject(JSON.parse(localStorage.getItem("cart")!));
  cartProducts$ = this.cartProducts.asObservable();

  changeCartProducts(cartProducts:any[]){
    this.cartProducts.next(cartProducts);
  }

}
