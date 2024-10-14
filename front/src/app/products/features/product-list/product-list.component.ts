import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import {ProductDetailsComponent} from "../../ui/product-details/product-details.component";
import {CartService} from "../../data-access/cart.service";
import {PaginatorModule} from "primeng/paginator";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, ProductDetailsComponent, PaginatorModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);


  public readonly products = this.productsService.products;

  public rows = 5;
  public firstProduct = 0;
  public lastProduct = this.rows;

  public isDialogVisible = false;
  public isDialogDetailsVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  public readonly product = signal<Product>(emptyProduct);
  cartProducts:any[] = [];

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  public onCancelDetailsDialog(){
    this.closeDetailsDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  private closeDetailsDialog(){
    this.isDialogDetailsVisible = false;
  }

  public onShowDetails(product: Product){
    this.product.set(product);
    this.isDialogDetailsVisible = true;
  }

  public onAddToCart(product: Product){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      this.cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }else{
      this.cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
    this.cartService.changeCartProducts(this.cartProducts);
  }

  public onPageChange(event:any){
    this.firstProduct = event.page * this.rows;
    this.lastProduct = this.firstProduct + this.rows;
  }
}
