import { Product } from './product.entity';

export class Category {

    constructor(
        public id: string,
        public image: string,
        public imageLocal: string,
        public  name: string,
        public our_price: string,
        public products:Product[],
        ) {
    }
   
    static fromJSON(json: any): Category {
        let cat = Object.create(Category.prototype);
        Object.assign(cat, json);       
       // for (let product in json.products) {
        //    console.log(product); // 1, "string", false
           // cat.products.push(Product.fromJSON(json.product));
      //  }
        
        return cat;
    }
    

}