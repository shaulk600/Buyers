import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ProductType } from "../../logic/ProductType";
import Product from "../product/Product";

interface Props {
  category: string;
  products: ProductType[];
  filteredProducts: ProductType[];
  setFilteredProducts: Dispatch<SetStateAction<ProductType[]>>;
}

export default function Products({ category, products, filteredProducts, setFilteredProducts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = products;

    if (category.toLowerCase() !== "all") {
      filtered = products.filter((product) => product.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [category, searchTerm, products]);

  return (
    <div className="comp-products">
      {filteredProducts.map((product) => (
        <Product key={product._id} id_product={product._id} />
      ))}

      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
