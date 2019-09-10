import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../entity/product.entity'
import { Category } from '../entity/Category.entity';
import { CartItem } from '../entity/cartitem.entity';
import { Observable, of } from 'rxjs';
import { ProductServiceService } from '../product-service.service';
import { Globals } from '../Global'
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	@Input() items: CartItem[] = [];
	total: number = 0;


	constructor(private location: Location,
		private globals: Globals, ) {

	}

	ngOnInit() {
		this.loadCart();
	}

	onChange(event: any) {
		console.log(event.target.value);
		console.log(event.target.id);
		this.updateQuantity(this.getSelectedItem(event.target.id),event.target.value);
		this.getSelectedItem(event.target.id).quantity = event.target.value;

	};


	private getSelectedItem(id: string): CartItem {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].product.id == id) {
				return this.items[i];
			}
		}
	}


	onKeydown(event: any) {
		console.log(event.target.value);
	};


	updateQuantity(ci: CartItem, quantity: number) {

		if (localStorage.getItem('cart') != null) {
			let cart: any = JSON.parse(localStorage.getItem('cart'));
			let index: number = -1;
			for (var i = 0; i < cart.length; i++) {
				let item: CartItem = JSON.parse(cart[i]);
				if (item.product.id == ci.product.id) {
					index = i;
					break;
				}
			}

			let item: CartItem = JSON.parse(cart[index]);
			item.quantity = quantity;
			cart[index] = JSON.stringify(item);
			localStorage.setItem("cart", JSON.stringify(cart));
		}
this.loadCart();
	}


	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			this.globals.cartCount = cart.length;
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

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: CartItem = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}


	goBack(): void {
		this.location.back();
	}

	calculateStyles() {
		return 'disabled';
}

}
