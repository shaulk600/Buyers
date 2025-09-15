import type { Product } from "../ProductType";

export async function getProducts(): Promise<Product[]>{
    const res = await fetch(`http://localhost:3000/buyers/products`);
    const products = await res.json();
    return products;
}

export async function getProduct(id: string) {
    const res = await fetch(`http://localhost:3000/buyers/products/${id}`);
    const product = await res.json();
    return product;
}