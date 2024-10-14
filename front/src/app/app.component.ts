import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import {BadgeModule} from "primeng/badge";
import {CartService} from "./products/data-access/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule],
})
export class AppComponent {
  title = "ALTEN SHOP";
  cartProducts: any[] | undefined;
  cartProductsLength: number | undefined;

  constructor(private cartService: CartService){}

  ngOnInit() {
    this.cartService.cartProducts$.subscribe(res => {
      this.cartProducts = res;
      this.cartProductsLength = this.cartProducts?.length;
    })
  }
}
