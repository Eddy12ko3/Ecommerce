import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  addNewProduct(product: SalesProduct){
    this.listProducts.push(product);
    this._products.next(this.listProducts);
  }

  removeProduct(index: number){
    this.listProducts.splice(index, 1);
    this._products.next(this.listProducts);
  }
}
