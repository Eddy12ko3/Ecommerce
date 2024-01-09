import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalesProduct } from 'src/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private listFavorites: Array<SalesProduct> = new Array<SalesProduct>();
  private _favorites: BehaviorSubject<Array<SalesProduct>>

  constructor() { 
    this._favorites = new BehaviorSubject<Array<SalesProduct>>([]);
  }

  get favorites(){
    return this._favorites.asObservable();
  }

  addNewFavorite(product: SalesProduct){
    this.listFavorites.push(product); 
    this._favorites.next(this.listFavorites);
  }

  removeFavorite(index: number){
    this.listFavorites.splice(index, 1);
    this._favorites.next(this.listFavorites);
  }
}
