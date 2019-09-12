import { Injectable } from '@angular/core';
import { Actions, Effect ,ofType} from '@ngrx/effects';
import { LoadProducts,ProductActionTypes, ProductAction, ProductDataAction } from '../actions/product.actions';
import {ProductServiceService} from '../product-service.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductEffects {

  products = [];

  constructor(private actions$: Actions,private productService:ProductServiceService) {
console.log(actions$.pipe(action => action));

  }

  @Effect(({ dispatch: true }))
  loadLocation$ = this.actions$
  .pipe(
    ofType<LoadProducts>(ProductActionTypes.LoadProducts),
    mergeMap((action) => this.productService.getProducts(action.payload.productId)
    .pipe(
      map(products => { 
        console.log("LoadProducts of in effects");
       
        for (let key in products) {     
          const citiesJSON = JSON.stringify(products[key]);
          const parsedCities = JSON.parse(citiesJSON);
          console.log("product data =="+citiesJSON); 
      
          parsedCities.products.forEach((parsedPrd) => {
            const prd: Product = {
               id: parsedPrd.id,
               image: parsedPrd.image,
               imageLocal: parsedPrd.imageLocal,
              name: parsedPrd.name,
               our_price: parsedPrd.our_price,
               price: parsedPrd.price,
               weight: parsedPrd.weight,
            };
            this.products.push(prd);
          });
      }
      

        return new ProductDataAction({productData: this.products});
      }),
    
    ))
);
  
  
  
  

  

}
