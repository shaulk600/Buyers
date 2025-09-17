import { useState, useEffect } from "react";
import Products from "../../components/products/Products";
import Categories from "../../components/products/Categories";
import type { ProductType } from "../../logic/ProductType";

interface Props {
  products: ProductType[];
}

export default function ProductsPage({ products }: Props) {
  const [category, setCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products);

  // בונה רשימת קטגוריות דינמית
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // סינון לפי קטגוריה
  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  }, [category, products]);

  return (
    <div className="page-products">
      <Products products={filteredProducts} />
      <Categories onSelectCategory={setCategory} categories={categories} />
    </div>
  );
}
