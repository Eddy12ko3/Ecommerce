import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { CartService } from 'src/app/services/controllers/cart.service';
import { SalesProduct } from 'src/interfaces/product.interface';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  listProducts: Array<SalesProduct> = new Array<SalesProduct>()
  suscriptionProducts?: Subscription

  constructor(
    private cartService: CartService
  ){}
  ngOnInit(): void {
    this.suscriptionProducts = this.cartService.products.subscribe((products) =>{
      this.listProducts = products
    })
  }

  get total(){
    return this.cartService.total
  }
  ngOnDestroy(): void {
    this.suscriptionProducts?.unsubscribe();
    this.suscriptionProducts = undefined;
  }
  
  onClickRemove(index: number){
    this.cartService.removeProduct(index);
  }

  onClickDecrease(index: number) {
		const product = this.listProducts.at(index);
		if (product && product.cant > 0) product.cant--;
    this.cartService.refreshPrice(index, product?.cant ?? 0)
	}
  
	onClickIncrease(index: number) {
		const product = this.listProducts.at(index);
		if (product) product.cant++;
    this.cartService.refreshPrice(index, product?.cant ?? 0)
	}
}
