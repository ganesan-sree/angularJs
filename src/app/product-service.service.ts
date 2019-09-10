import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from './entity/product.entity'
import { Category } from './entity/Category.entity';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  public productsObj: Product[];
  public category:string;
  public cat:Observable<Category[]>;
  
  private category1: Category;
  constructor(
    private http: HttpClient,
     private route: ActivatedRoute,
     private location: Location
     ){
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }





  getProducts(id:string): Observable<any[]> {
    return this.http.get<any[]>('https://freshvegbox-735a1.firebaseio.com/catalog/category/.json?orderBy=%22id%22&equalTo=%22'+id+'%22');
  }

  


}
