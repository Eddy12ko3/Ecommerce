import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/api/product.service';
import { CartService } from 'src/app/services/controllers/cart.service';
import { FavoritesService } from 'src/app/services/controllers/favorites.service';
import { SalesProduct } from 'src/interfaces/product.interface';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  private favoritesService = inject(FavoritesService)
  private toastr = inject(ToastrService)
  products: Array<SalesProduct> = new Array<SalesProduct>()

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ){}

  ngOnInit(): void {
    this.getSalesProducts()
  }

  getSalesProducts(){
    this.productService.getProducts().subscribe((listProducts: Array<SalesProduct>) =>{
      this.products = listProducts.map((product) => ({
        ...product,
        cant: 1,
        priceTotal: 0
      }));
      console.log(this.products)
    })
  }

  onClickAdd(product: SalesProduct){
    this.cartService.addNewProduct(product);
    this.toastr.success("producto agregado")
    console.log("hola")
  }

  onclickAddFavorite(product: SalesProduct){
    this.favoritesService.addNewFavorite(product);
  }

  onClickDecrease(index: number) {
		const product = this.products.at(index);
		if (product && product.cant > 0) product.cant--;
    this.refreshPrice(index)
	}
  
	onClickIncrease(index: number) {
		const product = this.products.at(index);
		if (product) product.cant++;
    this.refreshPrice(index)
	}
  
  private refreshPrice(index: number) {
		const product = this.products.at(index);
		if (product) {
			product.priceTotal = product.price * product.cant;
		}
	}
}
