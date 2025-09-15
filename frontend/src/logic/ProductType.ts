export type Product = {

   

    id?:string,

    imageProduct:string,
    title:string,
    description:string,
    regularPrice:string,
    groupPrice:string,
    category:string,
    orderd:[{}], ///הוזמנו ומי הזמין

    comments:[{id:number, text:string}] // מערך תגובות



    quantityCustomers?:string,
    quantityAllCustomers?:string
}