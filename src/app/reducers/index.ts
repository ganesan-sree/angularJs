import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {LoadProducts,ProductActionTypes,ProductAction, ProductDataAction} from '../actions/product.actions';
import { Action,State } from '@ngrx/store';
import { Product } from '../entity/product.entity';


export interface ProductState {
  productData: Product[] | null;
}

const initialProductState: ProductState = {
  productData: null
};

export interface AppState {
  product: ProductState;
 
}

/**
 * empty reducer because its not going to change the State
 * @param state 
 * @param action 
 */
export function productReducer(state: ProductState = initialProductState, action: ProductAction): ProductState {
  console.log("Going to call productReducer");
  switch (action.type) {
    case ProductActionTypes.LoadProducts:
    default:
      return state;
  }
}

export function productDataReducer(state: ProductState = initialProductState, action: ProductDataAction): ProductState {
  console.log("Going to call productReducer1");
 if(action.payload){
  console.log("product data in Reducers =="+action.payload.productData);
/**
  for (let key in action.payload.productData) {     
    const citiesJSON = JSON.stringify(action.payload.productData[key]);
    const parsedCities = JSON.parse(citiesJSON);
    console.log("product data =="+citiesJSON); 

    parsedCities.default.forEach((parsedPrd) => {
      const city: Product = {
         id: parsedPrd.id,
         image: parsedPrd.image,
         imageLocal: parsedPrd.imageLocal,
        name: parsedPrd.name,
         our_price: parsedPrd.our_price,
         price: parsedPrd.price,
         weight: parsedPrd.weight,
      };
      this.cities.push(city);
    });
}
 */

 }
  switch (action.type) {
    case ProductActionTypes.LoadDataProducts:
      return {
        productData: action.payload.productData
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  product:productDataReducer
};


export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];

export const selectProducts = (state: AppState) => state.product.productData;