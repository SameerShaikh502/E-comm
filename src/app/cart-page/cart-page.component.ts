import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, periceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[]|undefined;
  PriceSummary:periceSummary={
    price:0,
    discount:0,
    tax:0,
    total:0,
    delivery:0
  }
  
   

  constructor(private product:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.loadDetails()
  }
  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeTocart(cartId)
    .subscribe((result)=>{
      this.loadDetails();
      })
  
  }
  loadDetails(){
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result;
      let price=0;
      result.forEach((item)=>{
        if(item.quantity){
        price=price+(+item.Price* +item.quantity);
        }
      }) 
      this.PriceSummary.price=price;
      this.PriceSummary.discount=price/15;
      this.PriceSummary.tax=price/10;
      this.PriceSummary.delivery=100;
      this.PriceSummary.total=price+(price/10)+100-(price/10);
      if(!this.cartData.length){
        this.router.navigate(['/'])
      }

    })
  }
  checkout(){
    this.router.navigate(['/checkout'])
  }

}
