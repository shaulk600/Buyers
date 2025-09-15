import { useState } from "react";

type CategoriesProps = {
  onSelectCategory: (cat: string) => void;
};

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const categories = ["All", "Kitchen", "Electronics", "Furniture", "Computers"];
  const [selected, setSelected] = useState("All");

  const handleSelect = (category: string) => {
    setSelected(category);
    onSelectCategory(category);
  };

  return (
    <div>
      {categories.map((cat) => (
        <button key={cat} onClick={() => handleSelect(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}

