import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Login, signUp } from '../data-type';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  IsSellerLoggedIn = new BehaviorSubject<boolean>(false);
  IsLoggedInFailed = new EventEmitter<boolean>(false)
  seller: any;
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      
      if (result) {
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  }
  
  ngOnInit(): void { 
    this.seller.reloadeSeller()
  }
  reloadeSeller() {
    if (localStorage.getItem('seller')) {
      this.IsSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: Login) {
    
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
       
        if (result && result.body && result.body.length) {
          
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        }
        else {
         
          this.IsLoggedInFailed.emit(true)
        }
      })


  }


} 