import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/api/product.service';
import { CartService } from 'src/app/services/controllers/cart.service';
import { SalesProduct } from 'src/interfaces/product.interface';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
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
        cant: 1
      }));
      console.log(this.products)
    })
  }

  onClickAdd(product: SalesProduct){
    this.cartService.addNewProduct(product);
  }

  onClickDecrease(index: number) {
		const product = this.products.at(index);
		if (product && product.cant > 0) product.cant--;
	}
  
	onClickIncrease(index: number) {
		const product = this.products.at(index);
		if (product) product.cant++;
	}
  
}
