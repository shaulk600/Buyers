import { useState, type Dispatch, type SetStateAction } from "react";
import Products from "../../components/products/Products";
import Categories from "../../components/products/Categories";
import type { ProductType } from "../../logic/ProductType";

interface Props {
  products: ProductType[];
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
}

export default function ProductsPage({ products }: Props) {
  const [category, setCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products);

  const categories = ["All"];
  products.forEach(product => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  return (
    <>
      <Categories onSelectCategory={setCategory} categories={categories} />
      <Products 
        category={category}
        products={products}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
      />
    </>
  );
}
