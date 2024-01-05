import { Component, OnInit } from '@angular/core';
import { Login, cart, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  
  showLogin:boolean=true;
  authError:string="";
  constructor( private user:UserService, private product:ProductService) { }

  ngOnInit(): void {
    this.user.userAuthRelode();
  }
  signUp(data:signUp){
    this.user.userSignUp(data)
  }
  login(val: Login) {
    this.user.userLogin(val); 
    this.user.isLoginError.subscribe((isError: any) => {
      if(isError) {
        this.authError = "Email And Password Doesn't Match"
      }else {
        setTimeout(() => {
          this.localcartToRemorCtart();
        }, 300);
      }
    })
  }
  openLogin(){
    this.showLogin=true
  }
  openSignup(){
    this.showLogin=false
  }
  
  localcartToRemorCtart(){
    let data= localStorage.getItem('localcart')
    let user=localStorage.getItem('user'); 
    let userId= user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[]=JSON.parse(data)
    
  
  
    cartDataList.forEach((product:product,index) => {
      let cartData:cart={
        ...product,
        productId:product.id,
        userId,
      };
      delete cartData.id;
  
      setTimeout(() => {
        this.product.AddToCart(cartData).subscribe((result)=>{
          if(result){
           console.warn("item in db")
          }
       })
        if(cartDataList.length===index+1){
        localStorage.removeItem('localcart');
      }
      }, 500);
      
  
    });
    
    }
   setTimeout(() => {
    this.product.getCartList(userId)
   }, 2000);
  }
  
  }