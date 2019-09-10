import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { CartItem } from '../entity/cartitem.entity';
import { Observable, of } from 'rxjs';
import { Globals } from '../Global'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({  
  selector: 'app-order-confirmation',
  templateUrl: '../order-confirmation/order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  private items: CartItem[] = [];
  private total: number = 0;
 
  registerForm: FormGroup;
    submitted = false;

  constructor( private location: Location,
    private globals: Globals,
    private formBuilder: FormBuilder,
    private router: Router,) { 
    
  }

  ngOnInit() {
this.loadCart();
  }

  loadCart(): void {
		this.total = 0;
		this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart){
      this.globals.cartCount=cart.length;
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
    }
  }
	}
}
