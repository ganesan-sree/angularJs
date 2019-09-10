import { Component, OnInit,AfterViewInit, ElementRef, ViewChild } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { CartItem } from '../entity/cartitem.entity';
//import { Observable, of } from 'rxjs';
import { Globals } from '../Global'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { NgZone }  from '@angular/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit, AfterViewInit {

  @ViewChild("firstName") firstName: ElementRef;
  
  ngAfterViewInit(): void {
    console.log('This event fire after the content init have been loaded!');
    
  }

   items: CartItem[] = [];
   total: number = 0;
 
  registerForm: FormGroup;
    submitted = false;

 
  constructor( private location: Location,
    private globals: Globals,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { 
    
  }

  ngOnInit() {
    this.loadCart();

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      addressOne: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      terms: [''],

  });

  }


   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
       this.submitted = true;
       //alert(this.registerForm.get("terms").value);
       
       // stop here if form is invalid
     if (this.registerForm.valid && !this.registerForm.get('terms').value) {
       this.registerForm.get('terms').setErrors({
         "required": true
       });
       return;
     }

       if (this.registerForm.invalid) {
        this.firstName.nativeElement.focus();
           return;
       }else{    
        this.router.navigate(['/orderConfirmation']).then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });
      
       }

      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
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
