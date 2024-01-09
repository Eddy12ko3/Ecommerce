import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { CartService } from 'src/app/services/controllers/cart.service';
import { FavoritesService } from 'src/app/services/controllers/favorites.service';
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
  listFavorites: Array<SalesProduct> = new Array<SalesProduct>()

  suscriptionProducts?: Subscription
  suscriptionFavorites?: Subscription

  constructor(
    private cartService: CartService,
    private favoriteService: FavoritesService
  ){}

  get total(){
    return this.cartService.total
  }

  ngOnInit(): void {
    this.suscriptionProducts = this.cartService.products.subscribe(products => {
      this.products = products;
    })
    this.suscriptionFavorites = this.favoriteService.favorites.subscribe(favorites =>{
      this.listFavorites = favorites;
    })
  }

  ngOnDestroy(): void {
    this.suscriptionProducts?.unsubscribe();
    this.suscriptionProducts = undefined;
    this.suscriptionFavorites?.unsubscribe();
    this.suscriptionFavorites = undefined;
  }

  onClickRemove(index: number){
    this.cartService.removeProduct(index);
  }

  onclickAddProduct(product: SalesProduct){
    this.cartService.addNewProduct(product);
  }

  onClickRemoveFavorite(index: number){
    this.favoriteService.removeFavorite(index);
  }
}
