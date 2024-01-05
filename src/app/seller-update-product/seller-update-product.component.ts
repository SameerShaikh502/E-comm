import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  ProductData:undefined | product;
  productMessage:undefined | string;


  constructor( private route:ActivatedRoute, private product:ProductService) { }
  

  ngOnInit(): void {
    let productId= this.route.snapshot.paramMap.get('id')
    
    productId && this.product.getProductList(productId).subscribe((data)=>{
      
      this.ProductData=data
    })
  }

  submit(data:any){
    if(this.ProductData){
      data.id=this.ProductData.id;
    }
    
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="product has updated";
      }
    });
    setTimeout(() => {
      this.productMessage=undefined
    }, 3000);
    
  }
  

}
