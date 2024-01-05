import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/controllers/cart.service';
import { SalesProduct } from 'src/interfaces/product.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  products: Array<SalesProduct> = new Array<SalesProduct>()
  suscriptionProducts?: Subscription
  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.suscriptionProducts = this.cartService.products.subscribe(products => {
      this.products = products
    })
  }

  ngOnDestroy(): void {
    this.suscriptionProducts?.unsubscribe();
    this.suscriptionProducts = undefined;
  }
  onClickRemove(index: number){
    this.cartService.removeProduct(index);
  }


}
