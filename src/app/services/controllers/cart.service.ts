import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SalesProduct } from 'src/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private listProducts: Array<SalesProduct> = new Array<SalesProduct>;
  private _products: BehaviorSubject<Array<SalesProduct>>

  constructor() { 
    this._products = new BehaviorSubject<Array<SalesProduct>>([])
    
  }

  get products(){
    return this._products.asObservable();
  }

  get total(){
    return this.listProducts.reduce((preview, current) => preview + current.priceTotal, 0)
  }

  loadStorage(){
    const cartData = localStorage.getItem("cartService")
    if(cartData){
      this.listProducts = JSON.parse(cartData);
      this._products.next(this.listProducts);
    }
  }

  addNewProduct(product: SalesProduct){
    this.listProducts.push(product);
    this._products.next(this.listProducts);
    localStorage.setItem("cartService", JSON.stringify(this.listProducts))
  }

  removeProduct(index: number){
    this.listProducts.splice(index, 1);
    this._products.next(this.listProducts);
  }

  refreshPrice(index: number, cant: number){
    const product = this.listProducts.at(index)
    if(product) {
      product.priceTotal = product.price * cant
      this._products.next(this.listProducts);
    }
  }

  
  
}
