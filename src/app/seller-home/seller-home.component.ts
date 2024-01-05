import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
productList: undefined | product[];
productMessage:undefined|string;
icon=faTrash;
Editicon=faEdit;


  constructor(private product:ProductService ) { }

  ngOnInit(): void {
 this.List();
  }
  deleteProduct(id:number){


this.product.deleteProduct(id).subscribe((result)=>{
  if(result){
    this.productMessage="Your product is delete";
    this.List();
  }
})
setTimeout(() => {
  this.productMessage=undefined
}, 3000);
}
List(){
  this.product.productList().subscribe((result)=>{
   
    this.productList=result; 
  })
}

}
