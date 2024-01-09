import { Component, afterNextRender, inject } from '@angular/core';
import { HeaderComponent } from './ecommerce/shared/header/header.component';
import { FooterComponent } from './ecommerce/shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/controllers/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  private cartService = inject(CartService)


  constructor(){
    this.cartService.loadStorage();
  }


}
