import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import MenuCard from "./MenuCard";
import { fetchCategories } from "../services/billing";
import type { MenuItem } from "../types/MenuItem";
import { useAuth } from "../services/AuthContext";

export default function MenuSection({
  onAdd,
}: {
  onAdd: (item: MenuItem) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <div className="space-y-6  flex-1 p-4 overflow-y-auto">
      {categories.map(category => (
        <div key={category.id}>
          <h2 className="text-xl font-semibold mb-3">
            {category.name}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {category.menu_items.map(item => (
              <MenuCard
                key={item.id}
                item={{ ...item, quantity: 0 }}
                onClick={() => onAdd(item)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
