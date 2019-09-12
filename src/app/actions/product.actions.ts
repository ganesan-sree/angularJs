import { Action } from '@ngrx/store';



export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  LoadDataProducts = '[Product] Load Data Products',
  
}

export class ProductAction implements Action {
  type: string;
}


export class ProductDataAction implements Action {
  readonly type = ProductActionTypes.LoadDataProducts;

  constructor(readonly payload: {productData: any}) {
  }
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;
  constructor(readonly payload: {productId: string}) {

  }
}


export type ProductActions = LoadProducts | ProductDataAction;
