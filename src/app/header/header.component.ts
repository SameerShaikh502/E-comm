import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router, private products:ProductService) { }
  menuType:string='default'
  sellerName:string='';
  searchDropdown:undefined |product[];
  userName:string='';
  cartItem=0;
 
  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          
          let sellerStore=localStorage.getItem('seller');
            let sellerData= sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
             this. menuType='seller';
  
        }
        else if(localStorage.getItem('user')){
          let userStore=localStorage.getItem('user');
          let userData=userStore && JSON.parse(userStore);
          this.userName=userData.name;
          this. menuType='user';
          this.products.getCartList(userData.id)
        }
        else{
          
          this. menuType='default'

        }
      }
    });

    let cartData=localStorage.getItem('localcart');
    if(cartData){
      this.cartItem= JSON.parse(cartData).length
    }
    this.products.cartData.subscribe((items)=>{
      this.cartItem=items.length
    })
    
  }
Logout(){
      localStorage.removeItem('seller');
      this.route.navigate(['/'])
    }

    userLogout(){
      localStorage.removeItem('user');
      this.route.navigate(['/user-auth'])
      this.products.cartData.emit([]);
    }

    searchProduct(query:KeyboardEvent){
      if(query){
        const element= query.target as HTMLInputElement;
        
        this.products.searchProducts(element.value).subscribe((result)=>{
        const element= query.target as HTMLInputElement;
        if(result.length>5){
        result.length=5
        }
         this.searchDropdown=result;
         
        })
      }
    }
    blur(){
      this.searchDropdown=undefined
    }
    redirectToDetail(id:number){
      this.route.navigate(['/ProductDetails/'+id])

    }
    submitSearch(val:string){
      this.route.navigate([`search/${val}`])
    }
}
