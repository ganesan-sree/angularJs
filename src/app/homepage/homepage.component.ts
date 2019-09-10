import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../Global'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private categorys  = []; 
  constructor(
    private http: HttpClient,
     private route: ActivatedRoute,
     private location: Location,
     private globals:Globals,
     ){
  }

  ngOnInit() {
   // this.http.get('https://freshvegbox-735a1.firebaseio.com/catalog/category.json').subscribe((data:any[])=> {
     // this.categorys=data;
      //console.log(this.categorys);    
    //});
    this.loadCart();
  }

  loadCart(): void {	
		let cart = JSON.parse(localStorage.getItem('cart'));
		if(cart){
      this.globals.cartCount=cart.length;
    }
	}

  goBack(): void {
    this.location.back();
  }


  }


