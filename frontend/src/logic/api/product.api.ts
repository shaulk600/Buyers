import type { ProductType } from "../ProductType";

export async function getProducts(): Promise<ProductType[]>{
    const res = await fetch(`http://localhost:3000/buyers/products`);
    const products = await res.json();
    return products;
}

export async function getProduct(id: string) {
    const res = await fetch(`http://localhost:3000/buyers/products/${id}`);
    const product = await res.json();
    return product;
}

export async function updateProduct(id: string, product: ProductType) {
    const res = await fetch(`http://localhost:3000/buyers/products/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    });
    const result = await res.json();
    return result;
}