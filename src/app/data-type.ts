export interface signUp {
    name: string,
    password: string,
    email: string,
}
export interface Login {
    email: string,
    password: string,

}
export interface product {
    


    name: string,
    Price: number;
    color: string,
    category: string;
    description: string,
    image: string,
    id: number,
    quantity:undefined | number,
    productId: undefined | number
}
export interface cart{


    name: string,
    Price: number;
    color: string,
    category: string;
    description: string,
    image: string,
    id: number|undefined,
    quantity:undefined | number,
    userId: number,
    productId: number
}
export interface periceSummary{
    price:number,
    discount:number,
    tax:number,
    total:number,
    delivery:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}