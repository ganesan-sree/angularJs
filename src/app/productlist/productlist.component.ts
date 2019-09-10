import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../entity/product.entity'
import { Category } from '../entity/Category.entity';
import { CartItem } from '../entity/cartitem.entity';
import { Observable, of } from 'rxjs';
import {ProductServiceService} from '../product-service.service';
import { Globals } from '../Global'


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  private products  = []; 
  public products1: Product[];
  private id :string  = null; 

  constructor(
    private productService :ProductServiceService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private globals:Globals,
    
     ){
  }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.route.queryParamMap.subscribe(params => {
      console.log("param==="+params.keys);
      if(params.has('id')){
        this.id=params.get('id');
      }     
    });
    

    if(this.id ==null){
      this.id='17';
    }

    this.productService.getProducts(this.id).subscribe((data:any[])=> {
      for (let key in data) {     
        console.log ('key: ' +  key + ',  value: ' + data[key]);
        this.products=data[key].product;
        this.products1=(Category.fromJSON(data[key])).products;
    }
   
    this.loadCart();
    }); 
  }

  goBack(): void {
    this.location.back();
  }
  loadCart(): void {	
		let cart = JSON.parse(localStorage.getItem('cart'));
		if(cart){
      this.globals.cartCount=cart.length;
    }
	}

  addItem(pid){
    console.log(pid);
    console.log(this.products1);  
    var id = pid;
    console.log(this.find(id));
			if (id) {
				var item: CartItem = {
					product: this.find(id),
					quantity: 1
				};
				if (localStorage.getItem('cart') == null) {
					let cart: any = [];
					cart.push(JSON.stringify(item));
					localStorage.setItem('cart', JSON.stringify(cart));
				} else {
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item: CartItem = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let item: CartItem = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				
			} 
   
    console.log(this.products);
    this.loadCart();
  }


  find(id: string): Product {
    return this.products1[this.getSelectedIndex(id)];
}

private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products1.length; i++) {
        if (this.products1[i].id == id) {
            return i;
        }
    }
    return -1;
}

}
