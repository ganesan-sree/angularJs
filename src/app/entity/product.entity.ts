export class Product {

    constructor(
        public id: string,
        public image: string,
        public imageLocal: string,
        public  name: string,
        public our_price: string,
        public price: string,
        public weight: string,
        ) {
    }

    static fromJSON(json: any): Product {
        let prd = Object.create(Product.prototype);
        Object.assign(prd, json);
       
        return prd;
    }
}